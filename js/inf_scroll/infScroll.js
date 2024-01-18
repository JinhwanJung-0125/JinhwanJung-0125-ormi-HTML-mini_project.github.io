const show_more_btn = document.querySelector(".show-more-btn");
const close_btn = document.querySelector(".close-btn");

// scroll 이벤트 중단용 AbortController 객체
let removeScrollSignal = new AbortController();
let page = 0;

// show-more 버튼을 누르면 버튼 section을 숨기고 이미지 정보를 가져와 html에 추가한다.
// 이미지를 성공적으로 가져오면 close 버튼을 넣고 스크롤 이벤트에 헨들러를 추가한다.
// 이때, 핸들러는 AboutSignal에 abort()가 발생하면 삭제된다.
show_more_btn.addEventListener("click", async (event) => {
    const show_more = document.querySelector(".show-more");
    show_more.className = "show-more-hidden";

    // fetch가 성공적으로 이루어졌을 때에만 scroll 이벤트 리스너를 추가한다.
    if(await fetchImages(page++)) {
        const close_section = document.querySelector(".close-hidden");
        close_section.className = "close";

        window.addEventListener("scroll", throttle(resetScrollPosAndFetchImg, 1000), {
            signal: removeScrollSignal.signal
        });
    }
});

// close 버튼을 누르면 지금까지 추가된 이미지들을 삭제하고 scroll 이벤트 핸들러를 삭제한다.
// 그리고 핸들러 재등록을 위해 AbortControl 객체와 page 변수를 초기화한 뒤
// close 버튼을 숨기고 show-more 버튼을 다시 넣는다.
close_btn.addEventListener("click", () => {
    const fetched = document.querySelector(".fetched");
    const show_more = document.querySelector(".show-more-hidden");
    const close = document.querySelector(".close");

    fetched.replaceChildren();
    removeScrollSignal.abort();

    // 변수 초기화
    removeScrollSignal = new AbortController();
    page = 0;

    show_more.className = "show-more";
    close.className = "close-hidden";
});