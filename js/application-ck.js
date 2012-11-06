/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true *//*global jQuery:false, document:false */(function(e) {
    e(document).ready(function() {
        if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) return;
        var t = mapbox.map("map");
        t.addLayer(mapbox.layer().id("vwerbung.map-f3yuziyn"));
        var n = mapbox.markers.layer();
        mapbox.markers.interaction(n);
        t.addLayer(n);
        t.zoom(12).center({
            lat: 48.36384,
            lon: 10.89593
        });
        n.add_feature({
            geometry: {
                coordinates: [ 10.89593, 48.36384 ]
            },
            properties: {
                "marker-color": "#000",
                "marker-symbol": "star-stroked",
                title: "Example Marker",
                description: "This is a single marker."
            }
        });
        var r = e(".infobox");
        e('a[data-appui="readmore"]').on("click", function(t) {
            t.preventDefault();
            e("#jumbo").expose();
            var n = e(this).data("appui-target"), i = e(n);
            r.not(i).fadeOut("slow");
            e("#splashbox").fadeOut("fast");
            i.fadeIn("slow").promise().done(function() {
                e.scrollTo("#siteheader");
            });
        });
        e('a[data-appui-dismiss="infobox"]').on("click", function(t) {
            t.preventDefault();
            r.fadeOut("slow");
            e.mask.close();
            e("#splashbox").fadeIn("slow").promise().done(function() {
                e.scrollTo("#siteheader");
            });
        });
        e('a[data-appui="pagescroll"]').on("click", function(t) {
            t.preventDefault();
            var n = e(this).data("appui-target");
            e.scrollTo(n, {
                duration: "slow"
            }, {
                onAfter: function() {
                    n === "#navigation" && e("#scroll-top").fadeOut("slow");
                }
            });
        });
        e("#contact-form").on("submit", function() {
            e(this).fadeOut("fast");
            form_contents = e(this).serialize() + "&async=true";
            form_action = e(this).attr("action");
            e.ajax({
                type: "post",
                dataType: "text",
                data: form_contents,
                url: form_action,
                success: function(t) {
                    e("#site-contact").append('<div class="alert">' + t + "</div>");
                }
            });
            return !1;
        });
    });
})(jQuery);