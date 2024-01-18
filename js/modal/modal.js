const subscribe_btn = document.querySelector(".subscribe-btn");
const love_hodu_btn = document.querySelector(".love-hodu-btn");

// 구독 버튼의 이벤트 헨들러
// 먼저 입력한 값이 이메일 형식이 맞는지 확인한다.
// 형식이 올바르다면 감춰져있던 모달을 띄운다.
subscribe_btn.addEventListener("click", () => {
    if(!validateInput()) {
        alert("올바른 이메일 형식이 아닙니다!");
        return;
    }

    // input 내부 value 초기화
    const email = document.querySelector(".email-input");
    email.value = "";

    // 감춰진 모달을 띄운다.
    const modal = document.querySelector(".modal-hidden");
    modal.classList.replace("modal-hidden", "modal");
});

// 모달 버튼의 이벤트 헨들러
// 모달을 다시 감춘다.
love_hodu_btn.addEventListener("click", () => {
    // 모달을 다시 감춘다.
    const modal = document.querySelector(".modal");
    modal.classList.replace("modal", "modal-hidden");
});