define(
    [
        'backbone'
    ],
    function(Backbone) {
        var SearchResultsModel = Backbone.Model.extend({
            urlRoot: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5dd6dbc0385491626ea885c0d49937f6&format=json&nojsoncallback=1&text=',
            url: function() {
                return this.urlRoot + this.get('searchText');
            }
        });

        return SearchResultsModel;
    }
);
