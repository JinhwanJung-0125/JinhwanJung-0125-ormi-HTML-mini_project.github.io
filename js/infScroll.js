const show_more_btn = document.querySelector(".show-more-btn");
const close_btn = document.querySelector(".close-btn");
let page = 0;

show_more_btn.addEventListener("click", async (event) => {
    const show_more = document.querySelector(".show-more");

    show_more.classList.replace("show-more", "show-more-hidden");

    // fetch가 성공적으로 이루어졌을 때에만 scroll 이벤트 리스너를 추가한다.
    if(await fetchImages(page++)) {
        const close_section = document.querySelector(".close-hidden");

        close_section.classList.replace("close-hidden", "close");

        window.addEventListener("scroll", throttle(resetScrollPosAndFetchImg, 1000));
    }
});

close_btn.addEventListener("click", () => {

});