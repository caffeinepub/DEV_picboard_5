module {
  public type ImageId = Nat;

  public type ImageEntry = {
    id : ImageId;
    data : Blob;
  };
};
