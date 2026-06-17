import Map "mo:core/Map";
import Types "../types/images";
import ImagesLib "../lib/images";

mixin (
  images : Map.Map<Types.ImageId, Types.ImageEntry>,
  state : { var nextImageId : Nat },
) {
  public func uploadImage(data : Blob) : async Types.ImageId {
    ImagesLib.uploadImage(images, state, data);
  };

  public query func listImages() : async [Types.ImageEntry] {
    ImagesLib.listImages(images);
  };
};
