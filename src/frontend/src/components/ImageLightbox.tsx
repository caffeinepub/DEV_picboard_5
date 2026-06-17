import type { BoardImage } from "@/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

interface ImageLightboxProps {
  images: BoardImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = currentIndex !== null;
  const image = currentIndex !== null ? images[currentIndex] : null;
  const hasPrev = currentIndex !== null && currentIndex > 0;
  const hasNext = currentIndex !== null && currentIndex < images.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && currentIndex !== null)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext && currentIndex !== null)
        onNavigate(currentIndex + 1);
    },
    [isOpen, hasPrev, hasNext, currentIndex, onClose, onNavigate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <dialog
      data-ocid="board.dialog"
      open
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-full items-center justify-center bg-transparent p-0"
      aria-label="Image preview"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close lightbox"
        tabIndex={-1}
      />

      {/* Close button */}
      <button
        type="button"
        data-ocid="board.close_button"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          type="button"
          data-ocid="board.pagination_prev"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => currentIndex !== null && onNavigate(currentIndex - 1)}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          type="button"
          data-ocid="board.pagination_next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => currentIndex !== null && onNavigate(currentIndex + 1)}
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={image.url}
          alt=""
          className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
          style={{ maxWidth: "90vw" }}
        />
        {images.length > 1 && currentIndex !== null && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-foreground/60 text-background text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </dialog>
  );
}
