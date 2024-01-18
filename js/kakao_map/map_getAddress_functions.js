// 주소-좌표 변환 객체 생성
const geocoder = new kakao.maps.services.Geocoder();

// geocoder 객체의 coord2Address()로 해당 좌표의 지번을 얻는다.
function searchAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}