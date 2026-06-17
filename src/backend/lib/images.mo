import Map "mo:core/Map";
import Types "../types/images";

module {
  public type ImageId = Types.ImageId;
  public type ImageEntry = Types.ImageEntry;

  public func uploadImage(
    images : Map.Map<ImageId, ImageEntry>,
    state : { var nextImageId : Nat },
    data : Blob,
  ) : ImageId {
    let id = state.nextImageId;
    state.nextImageId += 1;
    images.add(id, { id; data });
    id;
  };

  public func listImages(
    images : Map.Map<ImageId, ImageEntry>
  ) : [ImageEntry] {
    images.values().toArray();
  };
};
