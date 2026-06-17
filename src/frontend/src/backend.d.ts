import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ImageId = bigint;
export interface ImageEntry {
    id: ImageId;
    data: Uint8Array;
}
export interface backendInterface {
    listImages(): Promise<Array<ImageEntry>>;
    uploadImage(data: Uint8Array): Promise<ImageId>;
}
