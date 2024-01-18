const scroll_top_btn_hover = document.querySelector(".scroll-top-btn-hover");

scroll_top_btn_hover.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});