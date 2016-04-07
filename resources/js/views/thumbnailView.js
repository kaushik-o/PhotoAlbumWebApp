define(
    [
        'backbone',
    ],
    function(Backbone) {
        var ThumbnailView = Backbone.View.extend({
            className: 'col-md-3',
            events: {
                'click': 'getFullSizeImage'
            },
            template: _.template('<div class="thumbnail"><img src="<%= link %>"></div>'),
            render: function() {
                this.$el.html(this.template({link: this.model.url()}));
                return this;
            },
            getFullSizeImage: function(e) {
                this.trigger('showFullSizeImage', this.model.getMediumImageUrl(), this.model.get('pos'));
            }
        }); 
        
        return ThumbnailView;
    }
);
