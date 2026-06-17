import type { backendInterface } from "../backend";

// Sample images: 2 small colored PNG placeholders (1x1 pixel PNGs in different colors)
// Red 1x1 PNG
const redPng = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0,
  0, 0, 1, 8, 2, 0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 12, 73, 68, 65, 84, 8,
  215, 99, 248, 207, 192, 0, 0, 0, 2, 0, 1, 227, 33, 188, 51, 0, 0, 0, 0, 73,
  69, 78, 68, 174, 66, 96, 130,
]);

// Blue 1x1 PNG
const bluePng = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0,
  0, 0, 1, 8, 2, 0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 12, 73, 68, 65, 84, 8,
  215, 99, 248, 207, 192, 0, 0, 0, 2, 0, 1, 227, 33, 188, 51, 0, 0, 0, 0, 73,
  69, 78, 68, 174, 66, 96, 130,
]);

export const mockBackend: backendInterface = {
  __images: async () => [],
  __state: async () => null,
  listImages: async () => [
    { id: BigInt(1), data: redPng },
    { id: BigInt(2), data: bluePng },
  ],
  uploadImage: async (_data: Uint8Array) => BigInt(3),
};
