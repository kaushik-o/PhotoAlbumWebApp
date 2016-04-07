define(
    [
        'backbone'
    ],
    function(Backbone) {
        // 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg'
        var ThumbnailModel = Backbone.Model.extend({
            urlRoot: 'https://farm',
            url: function() {
                return this.urlRoot + this.get('farmId') + '.staticflickr.com/' + this.get('serverId') + '/' + this.get('id') + '_' + this.get('secret') + '_t.jpg';
            },
            defaults: {
                farmId: '',
                serverId: '',
                secret: '',
                id: ''
            },
            getMediumImageUrl: function() {
                /**
                 * getting original and large size image urls have user imposed
                 * restrictions. So to have consistency medium sized image urls
                 * are retrieved
                 */
                return this.urlRoot + this.get('farmId') + '.staticflickr.com/' + this.get('serverId') + '/' + this.get('id') + '_' + this.get('secret') + '_z.jpg';
            }
        });

        return ThumbnailModel;
    }
);    
