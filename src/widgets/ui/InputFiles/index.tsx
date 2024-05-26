import React from "react";
import { getFiles } from "@/shared/util";

export function InputFiles() {
  const inputEl = React.useRef(null);

  return (
    <>
      <input
        type="file"
        multiple
        ref={inputEl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          getFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </>
  );
}
