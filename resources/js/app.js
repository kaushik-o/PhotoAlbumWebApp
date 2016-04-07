require.config({
    paths: {
        'jquery': '../../vendors/jquery',
        'underscore': '../../vendors/underscore',
        'backbone': '../../vendors/backbone',
        'bootstrap': '../../vendors/bootstrap-3.3.6-dist/js/bootstrap.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});

require(
    [
        'jquery',
        'underscore',
        'backbone',
        'bootstrap',
        'views/photoAlbumView'
    ],
    function($, _, Backbone, BootstrapJs, PhotoAlbumView) {
        new PhotoAlbumView();        
    }
);
