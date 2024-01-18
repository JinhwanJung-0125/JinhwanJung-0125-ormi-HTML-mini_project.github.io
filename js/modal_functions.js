/**
 * input 테그의 입력값의 형식을 체크한다.
 * 이때, 입력값에 포함된 공백 문자는 모두 삭제한다.
 * @returns {boolean}
 */
function validateInput() {
    const input = document.querySelector(".email-input");
    // 공백 제거
    const email = input.value.replaceAll(" ", "");

    return checkEmailFormat(email);
}

/**
 * 들어온 인자 값이 이메일 형식에 올바르다면 true를, 아니면 false를 반환한다.
 * @param str : string
 * @returns {boolean}
 */
function checkEmailFormat(str) {
    const regex = new RegExp("([A-Za-z0-9._]+)@([A-Za-z0-9-.]+)");
    return regex.test(str);
}