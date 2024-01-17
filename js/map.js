const map_container = document.querySelector(".map");
const options = {
    center: new kakao.maps.LatLng(33.44214, 126.5715),
    level: 3
};

// 지도 생성
const map = new kakao.maps.Map(map_container, options);

// 초기 마커 생성
const initMarkerPos = new kakao.maps.LatLng(33.44214, 126.5715);
const marker = new kakao.maps.Marker({
    position: initMarkerPos
});

marker.setMap(map);