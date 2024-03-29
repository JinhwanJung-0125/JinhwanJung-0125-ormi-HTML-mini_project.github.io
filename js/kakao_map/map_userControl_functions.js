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