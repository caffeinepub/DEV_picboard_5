import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onFiles: (files: FileList) => void;
  isPending: boolean;
}

export function UploadZone({ onFiles, isPending }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) onFiles(e.dataTransfer.files);
    },
    [onFiles],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <button
      type="button"
      data-ocid="board.upload_button"
      className={`w-full rounded-xl border-2 border-dashed transition-all duration-200 py-10 flex flex-col items-center justify-center gap-3 cursor-pointer select-none ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : isPending
            ? "border-border bg-muted/30 cursor-wait"
            : "border-border bg-card hover:border-primary/40 hover:bg-muted/20"
      }`}
      onClick={() => !isPending && fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      disabled={isPending}
      aria-label="Upload images"
    >
      <div
        className={`rounded-full p-3 ${
          isDragging ? "bg-primary/10" : "bg-muted"
        }`}
      >
        <Upload
          className={`w-5 h-5 ${
            isDragging ? "text-primary" : "text-muted-foreground"
          }`}
          strokeWidth={1.5}
        />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-medium text-foreground">
          {isPending ? "Uploading…" : "Click or drag images to upload"}
        </span>
        {!isPending && (
          <span className="text-xs text-muted-foreground">
            PNG, JPG, WEBP, GIF supported
          </span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onFiles(e.target.files)}
        data-ocid="board.file_input"
      />
    </button>
  );
}
