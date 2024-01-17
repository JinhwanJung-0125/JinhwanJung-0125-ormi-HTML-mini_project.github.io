// 이미지 정보를 받는다.
// 다만, 네트워크 에러 등의 이유로 이미지를 받지 못했다면 대신 에러 메시지를 html 문서에 추가한다.
async function fetchImages(pageNum)  {
    try {
        const response = await fetch(`https://cataas.com/api/cats?limit=6&skip=${6 * pageNum}&width=378&height=378`);

        if(!response.ok) {
            throw new Error("이미지를 가져오는데 실패했습니다. (네트워크 에러)");
        }

        const data = await response.json();

        addImages(data);
    }
    catch(error) {
        const inf_scroll_section = document.querySelector(".inf-scroll-section");
        inf_scroll_section.insertAdjacentHTML("beforeend", `<div>${error}</div>`);

        return false;
    }

    return true;
}

// data로 받은 이미지 정보를 html 문서의 fetched 클래스 요소 및에 추가한다.
function addImages(data) {
    const inf_scroll_fetched = document.querySelector(".fetched");
    let insert_HTML_elem = `<div class="img-line-style">`;

    data.forEach((item, idx) => {
        insert_HTML_elem += `<img src="https://cataas.com/cat/${item._id}?position=centre" alt="">`;

        // 이미지 한 줄 당 3개씩 넣고 개행
        if(idx === 2 || idx === 5) {
            insert_HTML_elem += `</div>`;
            inf_scroll_fetched.insertAdjacentHTML("beforeend", insert_HTML_elem);
            insert_HTML_elem = `<div class="img-line-style">`;
        }
    })
}

// 쓰로틀링 함수
function throttle(callback, delay = 500) {
    let timer = undefined;

    return function throttling(){
        if (!timer) {
            timer = setTimeout(() => {
                callback();
                timer = undefined;
            }, delay);
        }
    }
}

// 현재 스크롤 위치가 기준선을 넘었다면
// 스크롤 위치를 이미지 로딩 직전 위치로 이동시킨 후
// 이미지를 로딩한다.
function resetScrollPosAndFetchImg() {
    const inner_height = window.innerHeight;
    const scroll_top = document.documentElement.scrollTop;
    const threshold = document.documentElement.offsetHeight;

    const current_height = inner_height + scroll_top;

    if(current_height + 1500 >= threshold) {
        window.scrollTo({
            top: current_height - 1500,
            behavior: "smooth"
        });

        fetchImages(page++);
    }
}