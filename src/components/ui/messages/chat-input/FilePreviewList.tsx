import FilePreviewItem from "./FilePreviewItem";

interface FilePreviewListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function FilePreviewList({ files, onRemove }: FilePreviewListProps) {
  if (!files.length) return null;

  return (
    <div className="flex gap-2 mb-2 overflow-x-auto w-0 min-w-full">
      {files.map((file, index) => (
        <FilePreviewItem
          key={`${file.name}-${index}`}
          file={file}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}