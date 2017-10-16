let cheerio = require('cheerio');
let urls = require('./urls');

let crawling = function (url) {
    let link_list = [];
    $.each(url, function (num, u) {
        $.ajax(u, {
            origin: "http://franchise.ftc.go.kr",
            url: url,
            type: "GET",
            crossDomain: true,
            success: function (data) {
                const Ch = cheerio.load(data);
                let doc = document;
                let app = doc.querySelector(".app");
                app.innerHTML = Ch("#txt").html();

                doc.querySelector("#btn").addEventListener("click", () => {
                    let createAtag = doc.createElement("a");
                    createAtag.innerHTML = "link" + num;
                    createAtag.setAttribute("href", urls.url[num]);
                    createAtag.setAttribute("download", "url" + num + ".html");
                    doc.querySelector(".links").appendChild(createAtag);
                });
                doc.querySelector(".downloads").addEventListener("click", () => {
                    [].forEach.call(doc.querySelector(".links").querySelectorAll("a"), (v, i) => {
                        if(i === num) {
                            v.click();
                        }
                    });
                });
            }
        });
    })
}

crawling(urls.url);