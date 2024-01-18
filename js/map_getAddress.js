const location_info = document.querySelector(".location");

// 지도 클릭 시 해당 위치의 지번 표시
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    searchAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if(status === kakao.maps.services.Status.OK) {
            location_info.innerHTML = result[0].address.address_name;

            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
        }
    });
})