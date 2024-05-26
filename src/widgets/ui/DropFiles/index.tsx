import { getFiles } from "@/shared/util";

export function DropFiles() {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        getFiles(e.dataTransfer?.items);
      }}
    >
      Drop Files
    </div>
  );
}
