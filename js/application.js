/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false */

(function ($) {
    $(document).ready(function () {
        if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) {
            // it's not realistic to think we can deal with all the bugs
            // of IE 6 and lower. Fortunately, all this is just progressive
            // enhancement.
            return;
        }
        // vwerbung.map-f3yuziyn
        // mapbox.auto('map', 'vwerbung.map-f3yuziyn');
        var map = mapbox.map('map');
        map.addLayer(mapbox.layer().id('vwerbung.map-f3yuziyn'));
        
        // Create an empty markers layer
        var markerLayer = mapbox.markers.layer();
        
        // Add interaction to this marker layer. This
        // binds tooltips to each marker that has title
        // and description defined.
        mapbox.markers.interaction(markerLayer);
        map.addLayer(markerLayer);
        
        map.zoom(15).center({ lat: 48.36384, lon: 10.89593 });
        
        // Add a single feature to the markers layer.
        // You can use .features() to add multiple features.
        markerLayer.add_feature({
            geometry: {
                coordinates: [10.89593, 48.36384]
            },
            properties: {
                'marker-color': '#000',
                'marker-symbol': 'star-stroked',
                title: 'Example Marker',
                description: 'This is a single marker.'
            }
        });
        var boxes = $('.infobox');
        $('a[data-appui="readmore"]').on('click', function (e) {
            e.preventDefault();
            $('#jumbo').expose();
            var target_id = $(this).data('appui-target');
            var current = $(target_id);
            boxes.not(current).fadeOut('slow');
            $('#splashbox').fadeOut('fast');
            current.fadeIn('slow').promise().done(function () {
                $.scrollTo('#siteheader');
            });
        });
        $('a[data-appui-dismiss="infobox"]').on('click', function (e) {
            e.preventDefault();
            boxes.fadeOut('slow');
            $.mask.close();
            $('#splashbox').fadeIn('slow').promise().done(function () {
                $.scrollTo('#siteheader');
            });
        });
        $('a[data-appui="pagescroll"]').on('click', function (e) {
            e.preventDefault();
            var target_id = $(this).data('appui-target');
            $.scrollTo(target_id, {
                "duration": "slow"
            }, {onAfter: function () {
                if (target_id === '#navigation') {
                    $('#scroll-top').fadeOut('slow');
                }
            }});
        });
        $('#contact-form').on('submit', function () {
            $(this).fadeOut('fast');
            form_contents = $(this).serialize() + "&async=true";
            form_action = $(this).attr('action');
            $.ajax({
                type: 'post',
                dataType: 'text',
                data: form_contents,
                url: form_action,
                success: function (result) {
                    $('#site-contact').append('<div class="alert">' +
                                             result +
                                             '</div>');
                }
            });
            return false;
        });
    });
}(jQuery));