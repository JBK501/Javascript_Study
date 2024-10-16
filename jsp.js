// 사전처리 및 요청내용 추출 일반화 자동화
const jusojul = location.href;

const out = {}; // JSP out 객체 흉내
out.print = document.write.bind(document);

const request = {}; // JSP request 객체 흉내
request.getParameter = function (pName) {
  if (!request[pName]) return null;
  return request[pName].split(",")[0];
  // ☆☆☆ 값이 하나뿐인데도, split(",")[0]을 사용할 수 있는 이유 ☆☆☆
  // ,로 분리할 값이 없다면 빈 배열이 생성되고, 빈 배열의 첫 번째 요소가 문자열 자체가 됨.
};

request.getParameterValues = function (pName) {
  if (!request[pName]) return null;
  return request[pName].split(",");
};

request.url = jusojul.split("?")[0]; // ? 왼쪽 값
request.queryString = ""; // 초기값

if (jusojul.includes("?")) {
  // 요청값이 있다면
  request.queryString = decodeURIComponent(jusojul.split("?")[1]);
  let items = request.queryString.split("&");
  for (let i = 0; i < items.length; i++) {
    let nameValue = items[i].split("=");
    if (request[nameValue[0]]) {
      // 같은 key가 있는경우
      request[nameValue[0]] += `,${decodeURIComponent(nameValue[1])}`; // value만 추가한다. (+= 연산자)
    } else {
      request[nameValue[0]] = decodeURIComponent(nameValue[1]); // key 와 value 를 추가한다. (= 연산자)
    }
  }
}

// 날짜 포맷함수
function dateForm(pDate, pSep) {
  //   let ranAddDay = 1 + Math.round(Math.random() * (10 - 1));
  //   pDate.setDate(ranAddDay);
  let sYear = pDate.getFullYear();
  let sMonth = pDate.getMonth() + 1;
  if (sMonth < 10) sMonth = "0" + sMonth;
  let sDate = pDate.getDate();
  if (sDate < 10) sDate = "0" + sDate;

  return `${sYear}${pSep}${sMonth}${pSep}${sDate}`;
}

//   console.log(request);
//   out.print(request.getParameter("n_title") + "<br>");
//   out.print(request.getParameter("n_writer") + "<br>");
//   out.print(request.getParameter("n_cont") + "<br>");
//   out.print(request.getParameterValues("n_cate") + "<br>");
