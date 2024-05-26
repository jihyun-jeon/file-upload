import React from "react";
import { useState, useRef } from "react";
import { getFiles } from "@/shared/util";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// aws
const client = new S3Client({
  region: import.meta.env.VITE_S3_REGION,
  credentials: {
    secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY,
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
  },
});

export function FileReceiver({
  onSelectFiles,
  accept,
}: {
  onSelectFiles: (files: File[]) => void;
  accept?: string;
}) {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState("");

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver("blue");
      }}
      onDragLeave={() => {
        setIsDragOver("");
      }}
      onDrop={async (e) => {
        e.preventDefault();
        setIsDragOver("");
        const fileList = getFiles(e.dataTransfer?.items, accept);

        onSelectFiles(fileList);

        // aws upload
        fileList.map(async (fileItem) => {
          const command = new PutObjectCommand({
            Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
            Key: fileItem.name, // name of the file
            Body: fileItem,
          });
          try {
            const response = await client.send(command);
            console.log(response);
          } catch (err) {
            console.error(err);
          }
        });
      }}
    >
      <button
        onClick={() => {
          if (inputEl.current !== null) inputEl.current.click();
        }}
        style={{ width: "100px", height: "100px", backgroundColor: isDragOver }}
      >
        파일 선택
      </button>
      <input
        type="file"
        multiple
        accept={accept}
        ref={inputEl}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          const fileList = getFiles(e.target.files, accept);
          onSelectFiles(fileList);

          // aws upload
          fileList.map(async (fileItem) => {
            const command = new PutObjectCommand({
              Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
              Key: fileItem.name, // name of the file
              Body: fileItem,
            });
            try {
              const response = await client.send(command);
              console.log(response);
            } catch (err) {
              console.error(err);
            }
          });

          e.target.value = "";
        }}
        style={{ display: "none" }}
      />
    </div>
  );
}
