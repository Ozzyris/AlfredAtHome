/*
* FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com   
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://rss.cnn.com/rss/edition.rss",
            MaxCount: 25,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;

        $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + def.MaxCount + "&output=json&q=" + encodeURIComponent(def.FeedUrl) + "&hl=en&callback=?",
            dataType: "json",
            success: function (data) {

                $("#" + id).empty();
                $.each(data.responseData.feed.entries, function (e, item) {

                    var srclink = item.content;
                    var scrlink = srclink.split("src=\"");
                    var scrlink2 = scrlink[1].split("\" alt=");

                	var title = item.title.slice(0,27) + ' ...';

                	s += '<div class="item"><a href="' + item.link + '" class="thumbnail" target="_blank"><img src="' + scrlink2[0] + '" style="width:100%;"></a><h3>' + item.title + '</h3></div>';
                });

                $("#" + id).append('<div id="feedEkList">' + s + "</div>");
            }
        });
    };
})(jQuery);