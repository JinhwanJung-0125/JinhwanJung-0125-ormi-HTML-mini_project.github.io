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
zoom_in.addEventListener("click", zoomIn);
zoom_out.addEventListener("click", zoomOut);

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(event, map_type) {
    if(map_type === "roadmap") {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmap.className = "selected_btn";
        skyview.className = "unselected_btn";
    }
    else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyview.className = "selected_btn";
        roadmap.className = "unselected_btn";
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}
