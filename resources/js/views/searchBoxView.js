define(
    [
        'backbone'
    ],
    function(Backbone) {
        var SearchBoxView = Backbone.View.extend({
            id: 'search',
            className: 'row',
            events: {
                'keydown #search-input': 'getSearchResults',
                'click #search-button': 'getSearchResults',
                'click #clear-search': 'clearSearch',
                'click #modify-search': 'modifySearch'
            },
            template: '<div class="col-md-4 col-md-offset-4"><div id="search-bar" class="input-group"><input id="search-input" type="text" class="form-control" placeholder="Search Flickr images"><span class="input-group-btn"><button id="search-button" type="button" class="btn btn-primary">Search</button></span></div><div><button id="modify-search" type="button" class="btn btn-primary">Modify Search</button></div></div>',

            render: function() {
                this.$el.html(this.template);
                this.$el.find('#modify-search').hide();
                return this;
            },
            getSearchResults: function(e) {
                if(e.which === 13 || e.type === 'click') {
                    // call API here
                    var text = this.$el.find('input').val().trim();
                    if(text) { 
                        this.$el.find('#search-bar').hide();
                        this.$el.find('#modify-search').show();
                    }
                    if(text && text !== this.model.get('searchText')) {
                        this.model.set('searchText', text);
                        
                        // dummy data
                        //this.model.set('photos', {"page":1,"pages":6207,"perpage":100,"total":"620660","photo":[{"id":"25659464234","owner":"141443725@N03","secret":"ccb9c83011","server":"1519","farm":2,"title":"ABC_1292","ispublic":1,"isfriend":0,"isfamily":0},{"id":"25659446994","owner":"141443725@N03","secret":"57209fd9a6","server":"1459","farm":2,"title":"ABC_1267","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26238295126","owner":"141443725@N03","secret":"309a10ffb9","server":"1685","farm":2,"title":"ABC_1306","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26171191332","owner":"111108005@N04","secret":"25eb17d00d","server":"1492","farm":2,"title":"abc-5152","ispublic":1,"isfriend":0,"isfamily":0},{"id":"26237702706","owner":"111108005@N04","secret":"1eba9f4322","server":"1512","farm":2,"title":"abc-5155","ispublic":1,"isfriend":0,"isfamily":0}]});

                        //this.trigger('populateSearchResults');
                        /**
                         * getting the searchBoxView instance
                         */
                        var that = this; 

                        // API data
                        this.model.fetch({
                            success: function(model, response, options) {
                                //console.log(response);
                                /**
                                 * first clear previous results if any then
                                 * populate with new result
                                 */
                                that.trigger('clearSearchResults');
                                that.trigger('populateSearchResults');
                            },
                            error: function(model, response, options) {
                                
                            }
                        });
                    }   
                }
            },
            clearSearch: function(e) {
                this.$el.find('input').val('');
                this.model.clear();
                this.trigger('clearSearchResults');
            },
            modifySearch: function(e) {
                this.$el.find('#search-bar').show();
                this.$el.find('#modify-search').hide();
            }
        });

        return SearchBoxView;
    }
);
