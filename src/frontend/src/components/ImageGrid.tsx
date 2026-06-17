import { Skeleton } from "@/components/ui/skeleton";
import type { BoardImage } from "@/types";

interface ImageGridProps {
  images: BoardImage[];
  isLoading: boolean;
  onImageClick: (image: BoardImage, index: number) => void;
}

export function ImageGrid({ images, isLoading, onImageClick }: ImageGridProps) {
  if (isLoading) {
    return (
      <div
        data-ocid="board.loading_state"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
          <Skeleton key={key} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div
        data-ocid="board.empty_state"
        className="flex flex-col items-center justify-center py-28 gap-3 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">No images yet</p>
          <p className="text-xs text-muted-foreground">
            Upload some photos to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-ocid="board.list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
    >
      {images.map((img, i) => (
        <button
          key={img.id.toString()}
          type="button"
          data-ocid={`board.item.${i + 1}`}
          className="group aspect-square rounded-lg overflow-hidden bg-muted border border-border hover:border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => onImageClick(img, i)}
          aria-label={`Open image ${i + 1}`}
        >
          <img
            src={img.url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
