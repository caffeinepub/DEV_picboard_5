import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import Map "mo:core/Map";
import Types "types/images";
import ImagesMixin "mixins/images-api";

actor {
  let images : Map.Map<Types.ImageId, Types.ImageEntry>;
  let state : { var nextImageId : Nat };

  include MixinViews();
  include ImagesMixin(images, state);
};
