let cheerio = require('cheerio');
let urls = require('./urls');

let crawling = function (url) {
    let json_list = [];
    $.each(url, function (num, u) {
        $.ajax(u, {
            url: url,
            type: "GET",
            crossDomain: true,
            success: function (data) {
                const Ch = cheerio.load(data);
                let doc = document;
                let app = doc.querySelector(".app");
                let domain = "http://franchise.ftc.go.kr";
                app.innerHTML = Ch("#txt").html();
                [].forEach.call(doc.querySelectorAll(".table tr td:nth-child(2) .hover-link"), (v, i) => {
                    json_list.push(domain + v.href.replace("http://localhost:8080", ""));
                });

                const obj_s = JSON.stringify(json_list, null, "\t");
                const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(obj_s);
                const link = $("#link").attr("href", dataUri);
            }
        });
    })
}

crawling(urls.url);