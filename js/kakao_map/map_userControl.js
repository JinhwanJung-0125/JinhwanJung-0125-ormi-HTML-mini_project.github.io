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

zoom_in.addEventListener("click", zoomIn);
zoom_out.addEventListener("click", zoomOut);