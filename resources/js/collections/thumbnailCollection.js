define(
    [
        'backbone',
        'models/thumbnailModel'
    ],
    function(Backbone, ThumbnailModel) {
        var ThumbnailCollection = Backbone.Collection.extend({
            model: ThumbnailModel
        });

        return ThumbnailCollection;
    }
);
