let express = require('express');
let cheerio = require('cheerio');
let request = require('request');

let urls = [
    "http://franchise.ftc.go.kr/user/extra/main/62/firMst/view/jsp/LayOutPage.do?dataIdx=48431&spage=3&srow=10&column=&search=",
    // "http://franchise.ftc.go.kr/user/extra/main/62/firMst/view/jsp/LayOutPage.do?dataIdx=47458&spage=3&srow=10&column=&search="
];

let json = [];

for(let num=0; num<urls.length; num++){
    request(urls[num], function (error, response, html) {
        if (!error && response.statusCode == 200) {
            json.push({
                "가맹본부의 일반 현황": [{
                    "가맹본부 일반 현황": {}
                }, {
                    "가맹본부 재무상황": {}
                }, {
                    "가맹사업 임직원수": {}
                }, {
                    "가맹본부 브랜드 및 가맹사업 계열사 수": {}
                }], "가맹본부의 가맹사업 현황": [{
                    "가맹사업 개시일": {}
                }, {
                    "가맹점 및 직영점 현황": {}
                }, {
                    "가맹점 변동 현황": {}
                }, {
                    "가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액": {}
                }, {
                    "가맹지역본부 수": {}
                }, {
                    "광고·판촉비 내역": {}
                }, {
                    "가맹금사업자의 부담금": {}
                }], "가맹본부와 그 임원의 법 위반 사실": [{
                    "최근 3년간 법 위반 사실": {}
                }], "가맹점사업자의 부담": [{
                    "가맹점사업자의 부담금": {}
                }, {
                    "인테리어 비용": {}
                }], "영업활동에 대한 조건 및 제한": [{
                    "가맹계약 기간": {}
                }]
            });

            let $ = cheerio.load(html);
            let app = $.html();
            // console.log($(app).find('.box_flip:first-child .table:nth-child(2) thead th:first-child').text());
            console.log(json);
        }
    });
}

