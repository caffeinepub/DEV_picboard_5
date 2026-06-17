import { ImageGrid } from "@/components/ImageGrid";
import { ImageLightbox } from "@/components/ImageLightbox";
import { UploadZone } from "@/components/UploadZone";
import { useImages, useUploadImage } from "@/hooks/useQueries";
import type { BoardImage } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function BoardPage() {
  const { data: images = [], isLoading } = useImages();
  const uploadImage = useUploadImage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const toUpload = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (toUpload.length === 0) {
        toast.error("Please select image files only.");
        return;
      }
      for (const file of toUpload) {
        await uploadImage.mutateAsync(file).catch(() => {
          toast.error(`Failed to upload ${file.name}`);
        });
      }
      toast.success(
        toUpload.length === 1
          ? "Image uploaded"
          : `${toUpload.length} images uploaded`,
      );
    },
    [uploadImage],
  );

  const handleImageClick = useCallback((_img: BoardImage, index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className="space-y-5">
      <UploadZone onFiles={handleFiles} isPending={uploadImage.isPending} />

      <ImageGrid
        images={images}
        isLoading={isLoading}
        onImageClick={handleImageClick}
      />

      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
