let cheerio = require('cheerio');
let urls = require('./urls');

let crawling = function (url) {
    let json = [];
    $.each(url, function(num, u){
        $.ajax(u, {
            url: url,
            type: "GET",
            crossDomain: true,
            success: function(data){
                const Ch = cheerio.load(data);
                let doc = document;
                let app = doc.querySelector(".app");
                let index = 0;

                app.innerHTML = Ch("#txt").html();
                json.push({"가맹본부의 일반 현황":[{
                    "가맹본부 일반 현황": []
                },{
                    "가맹본부 재무상황": []
                },{
                    "가맹사업 임직원수": []
                },{
                    "가맹본부 브랜드 및 가맹사업 계열사 수": []
                }], "가맹본부의 가맹사업 현황":[{
                    "가맹사업 개시일": []
                }, {
                    "가맹점 및 직영점 현황": []
                }, {
                    "가맹점 변동 현황": []
                }, {
                    "가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액": []
                }, {
                    "가맹지역본부 수": []
                }, {
                    "광고·판촉비 내역": []
                }, {
                    "가맹금사업자의 부담금": []
                }], "가맹본부와 그 임원의 법 위반 사실":[{
                    "최근 3년간 법 위반 사실": []
                }], "가맹점사업자의 부담":[{
                    "가맹점사업자의 부담금": []
                }, {
                    "인테리어 비용": []
                }], "영업활동에 대한 조건 및 제한":[{
                    "가맹계약 기간": []
                }]});

                function pushTitle(v){
                    json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"].push({[v.innerText]: ""});
                }
                function pushText(v, i){
                    let keys = Object.keys(json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][i]);
                    for(let j in keys) {
                        json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][i][keys[j]] = v.innerText;
                    }
                }
                [].forEach.call(app.querySelectorAll(".table > thead th"), (v, i) => {
                    if(i <= 3) {
                        pushTitle(v);
                    }
                });
                [].forEach.call(app.querySelectorAll(".table > tbody th"), (v, i) => {
                    if(i <= 3) pushTitle(v);
                    else if(i <= 6) pushTitle(v);
                    else if(i >= 8 && i <= 11) pushTitle(v);
                });
                [].forEach.call(app.querySelectorAll(".table")[0].querySelectorAll("tbody td"), (v, i) => {
                    pushText(v, i);
                    index = i;
                });
                [].forEach.call(app.querySelectorAll(".table")[1].querySelectorAll("tbody td"), (v, i) => {
                    pushText(v, i+index);
                });
                index = 0;
                [].forEach.call(app.querySelectorAll(".table")[2].querySelectorAll("tbody th"), (v, i) => {
                    json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"].push({[v.innerText]: []});
                });
                for(let n=0; n<3; n++) {
                    [].forEach.call(app.querySelectorAll(".table")[2].querySelectorAll("tbody .listFaShow")[n].querySelectorAll("td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"][i]);
                        for(let j in keys) {
                            json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"][i][keys[j]].push(v.innerText);
                        }
                    });
                }
                var obj_s = JSON.stringify(json, null, "\t");
                var dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(obj_s);
                var link = $("#link").attr("href", dataUri);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    crawling(urls.url);
});