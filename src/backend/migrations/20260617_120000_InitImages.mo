import Map "mo:core/Map";

module {
  public type ImageId = Nat;

  public type ImageEntry = {
    id : ImageId;
    data : Blob;
  };

  type OldActor = {};

  type NewActor = {
    images : Map.Map<ImageId, ImageEntry>;
    state : { var nextImageId : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      images = Map.empty<ImageId, ImageEntry>();
      state = { var nextImageId = 0 };
    };
  };
};
