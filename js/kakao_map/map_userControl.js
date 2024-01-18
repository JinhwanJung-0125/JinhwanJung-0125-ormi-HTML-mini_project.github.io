const roadmap = document.querySelector(".roadmap");
const skyview = document.querySelector(".skyview");
const zoom_in = document.querySelector(".zoom-in");
const zoom_out = document.querySelector(".zoom-out");

// 선언식으로 만든 콜백 함수에 argument를 넘기는 방법
// 표현식으로 만든 콜백 함수 내에 우리가 사용할 콜백 함수를 event 객체와 argument를 넣고 명시해준다.
roadmap.addEventListener("click", (event) => {
    setMapType(event, "roadmap");
});
// 선언식으로 만든 콜백 함수에 argument를 넘기는 방법
skyview.addEventListener("click", (event) => {
    setMapType(event, "skyview");
});

// 지도 확대 버튼의 이벤트 리스너 -> 외부 JS 파일로 호출이 안돼 익명 함수로 대체함.
zoom_in.addEventListener("click", () => {
    map.setLevel(map.getLevel() - 1);
});
// 지도 축소 버튼의 이벤트 리스너 -> 외부 JS 파일로 호출이 안돼 익명 함수로 대체함.
zoom_out.addEventListener("click", () => {
    map.setLevel(map.getLevel() + 1);
});