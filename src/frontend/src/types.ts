import type { ImageEntry, ImageId } from "@/backend";

export type { ImageEntry, ImageId };

export interface UploadState {
  uploading: boolean;
  error: string | null;
}

export interface BoardImage {
  id: ImageId;
  url: string;
}
