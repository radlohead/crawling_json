let cheerio = require('cheerio');
let urls = require('./urls');

// let num = 0;

let crawling = function (url) {
    let json = [];
    for (let i = 0; i < url.length; i++) {
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
    }

    $.each(url, function(num, u){
        $.ajax(u, {
            url: url,
            type: "GET",
            crossDomain: true,
            success: function (data) {
                const Ch = cheerio.load(data);
                let doc = document;
                let app = doc.querySelector(".app");
                let index = 0;

                app.innerHTML = Ch("#txt").html();

                [].forEach.call(app.querySelectorAll(".table")[0].querySelectorAll("thead th"), (v, i) => {
                    if (i <= 3) {
                        json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][v.innerText] = "";
                    }
                });

                function pushText(v, i) {
                    let keys = Object.keys(json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"]);
                    json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][keys[i]] = v.innerText;
                    if (i < 3) {
                        json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][keys[i]] = v.innerText.replace(/상호|영업표지|대표자/gi, "");
                    }
                }

                [].forEach.call(app.querySelectorAll(".table > tbody th"), (v, i) => {
                    if (i <= 3) json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][v.innerText] = "";
                    else if (i <= 6) json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][v.innerText] = "";
                    else if (i >= 8 && i <= 11) json[num]["가맹본부의 일반 현황"][0]["가맹본부 일반 현황"][v.innerText] = "";
                });
                [].forEach.call(app.querySelectorAll(".table")[0].querySelectorAll("tbody td"), (v, i) => {
                    pushText(v, i);
                    index = i;
                });
                [].forEach.call(app.querySelectorAll(".table")[1].querySelectorAll("tbody td"), (v, i) => {
                    pushText(v, i + index);
                });
                index = 0;

                [].forEach.call(app.querySelectorAll(".table")[2].querySelectorAll("tbody th"), (v, i) => {
                    json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"][v.innerText] = [];
                });
                for (let n = 0; n < 3; n++) {
                    [].forEach.call(app.querySelectorAll(".table")[2].querySelectorAll("tbody .listFaShow")[n].querySelectorAll("td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"]);
                        for (let j in keys) {
                            if (j === "0") {
                                json[num]["가맹본부의 일반 현황"][1]["가맹본부 재무상황"][keys[i]].push(v.innerText);
                            }
                        }
                    });
                }

                [].forEach.call(app.querySelectorAll(".table")[3].querySelectorAll("thead th"), (v, i) => {
                    json[num]["가맹본부의 일반 현황"][2]["가맹사업 임직원수"][v.innerText] = "";
                });
                [].forEach.call(app.querySelectorAll(".table")[3].querySelectorAll("tbody td"), (v, i) => {
                    let keys = Object.keys(json[num]["가맹본부의 일반 현황"][2]["가맹사업 임직원수"]);
                    for (let j in keys) {
                        if (j === "0") {
                            json[num]["가맹본부의 일반 현황"][2]["가맹사업 임직원수"][keys[i]] = v.innerText;
                        }
                    }
                });

                [].forEach.call(app.querySelectorAll(".table")[4].querySelectorAll("thead th"), v => {
                    json[num]["가맹본부의 일반 현황"][3]["가맹본부 브랜드 및 가맹사업 계열사 수"][v.innerText] = "";
                });
                [].forEach.call(app.querySelectorAll(".table")[4].querySelectorAll("tbody td"), (v, i) => {
                    let keys = Object.keys(json[num]["가맹본부의 일반 현황"][3]["가맹본부 브랜드 및 가맹사업 계열사 수"]);
                    for (let j in keys) {
                        if (j === "0") {
                            json[num]["가맹본부의 일반 현황"][3]["가맹본부 브랜드 및 가맹사업 계열사 수"][keys[i]] = v.innerText;
                        }
                    }
                });

                json[num]["가맹본부의 가맹사업 현황"][0]["가맹사업 개시일"]["가맹사업 개시일"] = "";
                [].forEach.call(app.querySelectorAll(".table")[5].querySelectorAll("thead td"), (v, i) => {
                    let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][0]["가맹사업 개시일"]);
                    for (let j in keys) {
                        json[num]["가맹본부의 가맹사업 현황"][0]["가맹사업 개시일"][keys[i]] = v.innerText;
                    }
                });

                function headOffice_state() {
                    [].forEach.call(app.querySelectorAll(".table")[6].querySelectorAll("thead tr:first-child th.listOfCntShow"), v => {
                        json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"][v.innerText] = {};
                    });
                    let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"]);
                    for (let j in keys) {
                        json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"][keys[j]] = {
                            "전체": {},
                            "가맹점수": {},
                            "직영점수": {}
                        };
                    }

                    let temp = [];
                    for (let n = 0; n < 9; n++) {
                        temp[n] = [];
                    }

                    [].forEach.call(app.querySelectorAll(".table")[6].querySelectorAll("tbody tr td.noborder"), v => {
                        for (let j = 0; j < temp.length; j++) {
                            temp[j][v.innerText] = "";
                        }
                    });

                    for (let n = 0; n < 3; n++) {
                        function storeNum(index) {
                            [].forEach.call(app.querySelectorAll(".table")[6].querySelectorAll("tbody tr td:nth-child(" + index + ")"), (v, i) => {
                                if (n === 0) {
                                    let keys4 = Object.keys(temp[index - 2]);
                                    temp[index - 2][keys4[i]] = v.innerText;
                                }
                            });
                        }

                        for (let i = 2; i < 11; i++) {
                            storeNum(i);
                        }
                    }

                    let keys5 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"]);
                    let keys6 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"][keys5[0]]);
                    for (let i = 0, j = 0, k = 0; i < 3; i++) {
                        for (j, k; j < 3, k < 9; j++, k++) {
                            if (j === 3) {
                                ++i;
                                j = 0;
                            }

                            let keys = Object.keys(temp[k]);
                            for (let m in keys) {
                                json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"][keys5[i]][keys6[j]][keys[m]] = "";
                            }
                            for (let m in keys) {
                                json[num]["가맹본부의 가맹사업 현황"][1]["가맹점 및 직영점 현황"][keys5[i]][keys6[j]][keys[m]] = temp[k][keys[m]];
                            }
                        }
                    }
                }

                headOffice_state();

                function currentState() {
                    let temp = [];
                    [].forEach.call(app.querySelectorAll(".table")[7].querySelectorAll("thead th"), v => {
                        json[num]["가맹본부의 가맹사업 현황"][2]["가맹점 변동 현황"][v.innerText] = [];
                        temp.push(v.innerText);
                    });
                    for (let index = 0; index <= 5; index++) {
                        [].forEach.call(app.querySelectorAll(".table")[7].querySelectorAll("tbody td:nth-child(" + index + ")"), (v, i) => {
                            json[num]["가맹본부의 가맹사업 현황"][2]["가맹점 변동 현황"][temp[index - 1]].push(v.innerText);
                        });
                    }
                }

                currentState();

                function sales() {
                    [].forEach.call(app.querySelectorAll(".table")[8].querySelectorAll("thead tr th"), (v, i) => {
                        if (i === 1) {
                            json[num]["가맹본부의 가맹사업 현황"][3]["가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액"][v.innerText] = {
                                "가맹점수": {},
                                "평균매출액": {},
                                "면적(3.3㎡)당 평균매출액": {}
                            };
                        }
                    });

                    let temp = [];
                    for (let n = 0; n < 3; n++) {
                        temp[n] = new Array();
                    }
                    [].forEach.call(app.querySelectorAll(".table")[8].querySelectorAll("tbody tr td:first-child"), v => {
                        for (let j = 0; j < temp.length; j++) {
                            temp[j][v.innerText] = "";
                        }
                    });

                    function salesNum(index) {
                        [].forEach.call(app.querySelectorAll(".table")[8].querySelectorAll("tbody tr td:nth-child(" + index + ")"), (v, i) => {
                            let keys = Object.keys(temp[index - 2]);
                            let keys2 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][3]["가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액"]);
                            temp[index - 2][keys[i]] = v.innerText;
                        });
                    }

                    for (let index = 2; index < 5; index++) {
                        salesNum(index);
                    }

                    let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][3]["가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액"]);
                    let keys2 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][3]["가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액"][keys]);
                    let salesList = json[num]["가맹본부의 가맹사업 현황"][3]["가맹점사업자의 평균 매출액 및 면적(3.3㎡)당 매출액"];
                    let keys3;
                    for (let i = 0; i < 3; i++) {
                        keys3 = Object.keys(temp[i]);
                    }
                    for (let j in keys2) {
                        for (let k = 0; k < keys3.length; k++) {
                            salesList[keys][keys2[j]][keys3[k]] = temp[j][keys3[k]];
                        }
                    }
                }

                sales();

                function membership_enterPrise() {
                    [].forEach.call(app.querySelectorAll(".table")[9].querySelectorAll("thead tr th"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][4]);
                        json[num]["가맹본부의 가맹사업 현황"][4][keys] = {[v.innerText]: ""};
                    });
                    [].forEach.call(app.querySelectorAll(".table")[9].querySelectorAll("thead tr td"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][4]);
                        json[num]["가맹본부의 가맹사업 현황"][4][keys]["가맹지역본부(지사,지역총판)수"] = v.innerText;
                    });
                }

                membership_enterPrise();

                function salesPromotionExpense() {
                    [].forEach.call(app.querySelectorAll("table")[10].querySelectorAll("thead tr th"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][5]);
                        json[num]["가맹본부의 가맹사업 현황"][5][keys][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll("table")[10].querySelectorAll("tbody tr td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][5]);
                        let keys2 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][5][keys]);
                        json[num]["가맹본부의 가맹사업 현황"][5][keys][keys2[i]] = v.innerText;
                    });
                }

                salesPromotionExpense();

                function liabilityAmount() {
                    [].forEach.call(app.querySelectorAll("table")[11].querySelectorAll("thead tr th"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6]);
                        json[num]["가맹본부의 가맹사업 현황"][6][keys][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll("table")[11].querySelectorAll("thead tr td"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6]);
                        let keys2 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6][keys]);
                        json[num]["가맹본부의 가맹사업 현황"][6][keys][keys2[0]] = v.innerText;
                    });
                    [].forEach.call(app.querySelectorAll("table")[11].querySelectorAll("tbody tr th"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6]);
                        json[num]["가맹본부의 가맹사업 현황"][6][keys][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll("table")[11].querySelectorAll("tbody tr td"), v => {
                        let keys = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6]);
                        let keys2 = Object.keys(json[num]["가맹본부의 가맹사업 현황"][6][keys]);
                        json[num]["가맹본부의 가맹사업 현황"][6][keys][keys2[1]] = v.innerText;
                    });
                }

                liabilityAmount();

                function lawViolations() {
                    [].forEach.call(app.querySelectorAll(".table")[12].querySelectorAll("thead tr th"), v => {
                        json[num]["가맹본부와 그 임원의 법 위반 사실"][0]["최근 3년간 법 위반 사실"][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll(".table")[12].querySelectorAll("tbody tr td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹본부와 그 임원의 법 위반 사실"][0]["최근 3년간 법 위반 사실"]);
                        json[num]["가맹본부와 그 임원의 법 위반 사실"][0]["최근 3년간 법 위반 사실"][keys[i]] = v.innerText;
                    });
                }

                lawViolations();

                function liabilityAmount2() {
                    [].forEach.call(app.querySelectorAll(".table")[13].querySelectorAll("thead tr th"), v => {
                        json[num]["가맹점사업자의 부담"][0]["가맹점사업자의 부담금"][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll(".table")[13].querySelectorAll("tbody tr td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹점사업자의 부담"][0]["가맹점사업자의 부담금"]);
                        json[num]["가맹점사업자의 부담"][0]["가맹점사업자의 부담금"][keys[i]] = v.innerText;
                    });
                }

                liabilityAmount2();

                function interiorCost() {
                    [].forEach.call(app.querySelectorAll(".table")[14].querySelectorAll("thead tr th"), v => {
                        json[num]["가맹점사업자의 부담"][1]["인테리어 비용"][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll(".table")[14].querySelectorAll("tbody tr td"), (v, i) => {
                        let keys = Object.keys(json[num]["가맹점사업자의 부담"][1]["인테리어 비용"]);
                        json[num]["가맹점사업자의 부담"][1]["인테리어 비용"][keys[i]] = v.innerText;
                    });
                }

                interiorCost();

                function partnerShipPeriod() {
                    [].forEach.call(app.querySelectorAll(".table")[15].querySelectorAll("thead tr:first-child th"), v => {
                        json[num]["영업활동에 대한 조건 및 제한"][0]["가맹계약 기간"][v.innerText] = {};
                    });
                    [].forEach.call(app.querySelectorAll(".table")[15].querySelectorAll("thead tr:nth-child(2) th"), v => {
                        json[num]["영업활동에 대한 조건 및 제한"][0]["가맹계약 기간"]["계약기간"][v.innerText] = "";
                    });
                    [].forEach.call(app.querySelectorAll(".table")[15].querySelectorAll("tbody tr td"), (v, i) => {
                        let keys = Object.keys(json[num]["영업활동에 대한 조건 및 제한"][0]["가맹계약 기간"]);
                        let keys2 = Object.keys(json[num]["영업활동에 대한 조건 및 제한"][0]["가맹계약 기간"][keys]);
                        json[num]["영업활동에 대한 조건 및 제한"][0]["가맹계약 기간"][keys][keys2[i]] = v.innerText;
                    });
                }

                partnerShipPeriod();

                const obj_s = JSON.stringify(json, null, "\t");
                const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(obj_s);
                const link = $("#link").attr("href", dataUri);
                console.log(num);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    crawling(urls.url);
});