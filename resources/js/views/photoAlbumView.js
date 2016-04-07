define(
    [
        'backbone',       
        'models/searchResultsModel',
        'views/searchBoxView',
        'models/thumbnailModel',
        'views/thumbnailView',
        'collections/thumbnailCollection'
    ],
    function(Backbone, SearchResultsModel, SearchBoxView, ThumbnailModel, ThumbnailView, ThumbnailCollection) {
        var searchResultsModel, searchBoxView, thumbnailCollection;
        
        var PhotoAlbumView = Backbone.View.extend({
            el: 'body',
            events: {
                'click #next-image': 'showNextImage',
                'click #prev-image': 'showPrevImage',
                'click #play-stop-slideshow': 'playStopSlideShow'
            },
            initialize: function() {
                searchResultsModel = new SearchResultsModel();
                searchBoxView = new SearchBoxView({model:searchResultsModel});
                thumbnailCollection = new ThumbnailCollection();
                this.$el.append(searchBoxView.render().el);
                this.$el.append('<div class="row"><div id="search-results" class="col-md-12"></div></div>');
                this.listenTo(searchBoxView, 'populateSearchResults', this.renderThumbnails);
                this.listenTo(searchBoxView, 'clearSearchResults', this.clearResults);
                this.$el.find('#image-modal').on('hidden.bs.modal', this.stopSlideShow.bind(this));
            },    
            renderThumbnails: function() {
                this.$el.find('#search-bar').hide();
                this.$el.find('#modify-search').show();
                var photosObject = searchBoxView.model.get('photos');

                var count = 1;
                
                _.each(photosObject.photo, function(photo) {
                    if(count % 4 === 1) {
                        this.$el.find('#search-results').append('<div class="row">');
                    }

                    var thumbnailModel = new ThumbnailModel({
                        id: photo.id,
                        farmId: photo.farm,
                        serverId: photo.server,
                        secret: photo.secret,
                        pos: count - 1
                    });

                    var thumbnailView = new ThumbnailView({model: thumbnailModel});

                    this.$el.find('#search-results').find('.row').last().append(thumbnailView.render().el);
                
                    this.listenTo(thumbnailView, 'showFullSizeImage', this.startSlideShow);
                    
                    thumbnailCollection.add(thumbnailView);

                    count++;

                    if(count % 4 === 0) {
                        this.$el.append('</div>');
                    }

                }, this);

                this.$el.find('.row').css({
                    'margin-top': '20px'
                });

            },
            currentSlideShowPos: -1,
            showFullSizeImage: function(url, pos) {
                this.currentSlideShowPos = pos;
                this.$el.find('#image-modal').find('.modal-body').find('#original-image').attr('src', url);
                this.$el.find('#image-modal').modal('show');
                this.$el.find('#image-modal').find('.modal-dialog').css({
                    width: 'auto',
                    height: 'auto'
                });

                if(this.currentSlideShowPos === thumbnailCollection.length - 1) {
                    this.$el.find('#image-modal').find('#next-image').prop('disabled', true);    
                }
                else if(this.currentSlideShowPos === 0) {
                    this.$el.find('#image-modal').find('#prev-image').prop('disabled', true);    
                }
                else {
                    this.$el.find('#image-modal').find('#prev-image').prop('disabled', false);
                    this.$el.find('#image-modal').find('#next-image').prop('disabled', false);
                }
            },
            showNextImage: function() {
                if(this.currentSlideShowPos < thumbnailCollection.length - 1) {
                    this.currentSlideShowPos++;
                    var thumbnailModel = thumbnailCollection.at(this.currentSlideShowPos).attributes.model;
                    this.showFullSizeImage(thumbnailModel.getMediumImageUrl(), this.currentSlideShowPos);
                }   

            },
            showPrevImage: function() {
                if(this.currentSlideShowPos >= 0) {
                    this.currentSlideShowPos--;
                    var thumbnailModel = thumbnailCollection.at(this.currentSlideShowPos).attributes.model;
                    this.showFullSizeImage(thumbnailModel.getMediumImageUrl(), this.currentSlideShowPos);
                }
            },
            slideShowState: '',
            timeoutIds: [],
            startSlideShow: function(url, pos) {
                this.slideShowState = 'play';
                this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').removeClass();
                this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').addClass('glyphicon glyphicon-pause');

                //saving context;
                var that = this;
                var i = pos;
    
                for(i = pos; i < thumbnailCollection.length; i++) {
                    (function(i) {
                        var timeoutid = setTimeout(function() {
                            that.currentSlideShowPos++;
                            var thumbnailModel = thumbnailCollection.at(i).attributes.model;
                            that.showFullSizeImage(thumbnailModel.getMediumImageUrl(), i);
                        }, 2000*(i-pos));

                        that.timeoutIds.push(timeoutid);
                    })(i);    
                           
                }
            },
            stopSlideShow: function() {
                this.slideShowState = 'stop';
                for(var i = 0; i < this.timeoutIds.length; i++) {
                    clearTimeout(this.timeoutIds[i]);
                }        
            },
            playStopSlideShow: function() {
                if(this.slideShowState === 'play') {
                    this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').removeClass();
                    this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').addClass('glyphicon glyphicon-play');
                    this.stopSlideShow();
                }
                else if(this.slideShowState === 'stop') {
                    this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').removeClass();
                    this.$el.find('#image-modal').find('#play-stop-slideshow').find('span').addClass('glyphicon glyphicon-pause');
                    var thumbnailModel = thumbnailCollection.at(this.currentSlideShowPos).attributes.model;
                    this.startSlideShow(thumbnailModel.getMediumImageUrl(), this.currentSlideShowPos);
                }
            },
            clearResults: function() {
                thumbnailCollection.reset();
                this.$el.find('#search-results').html('');
            }
        });

        return PhotoAlbumView;
    }
);
