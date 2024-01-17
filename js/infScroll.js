const show_more_btn = document.querySelector(".show-more-btn");
const close_btn = document.querySelector(".close-btn");

// scroll 이벤트 중단용 AbortController 객체
let removeScrollSignal = new AbortController();
let page = 0;

show_more_btn.addEventListener("click", async (event) => {
    const show_more = document.querySelector(".show-more");

    show_more.classList.replace("show-more", "show-more-hidden");

    // fetch가 성공적으로 이루어졌을 때에만 scroll 이벤트 리스너를 추가한다.
    if(await fetchImages(page++)) {
        const close_section = document.querySelector(".close-hidden");

        close_section.classList.replace("close-hidden", "close");

        window.addEventListener("scroll", throttle(resetScrollPosAndFetchImg, 1000), {
            signal: removeScrollSignal.signal
        });
    }
});

close_btn.addEventListener("click", () => {
    const fetched = document.querySelector(".fetched");
    const show_more = document.querySelector(".show-more-hidden");
    const close = document.querySelector(".close");

    fetched.replaceChildren();
    removeScrollSignal.abort();

    // 변수 초기화
    removeScrollSignal = new AbortController();
    page = 0;

    show_more.classList.replace("show-more-hidden", "show-more");
    close.classList.replace("close", "close-hidden");
});