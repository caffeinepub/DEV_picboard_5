import { createActor } from "@/backend";
import type { BoardImage } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useImages() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BoardImage[]>({
    queryKey: ["images"],
    queryFn: async () => {
      if (!actor) return [];
      const entries = await actor.listImages();
      return entries.map((entry) => ({
        id: entry.id,
        url: URL.createObjectURL(
          new Blob([entry.data.buffer as ArrayBuffer], { type: "image/*" }),
        ),
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error("Actor not ready");
      const buffer = await file.arrayBuffer();
      const data = new Uint8Array(buffer);
      return actor.uploadImage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
