/* 무한 스크롤 기능 구현에 사용되는 함수들 */

/**
 * fetch API를 통해 한번에 6장의 이미지 정보를 받는다.<br>
 * pageNum을 통해 API에서 제공하는 이미지를 몇 페이지에서 받을 지 결정할 수 있다.<br>
 * 다만, 네트워크 에러 등의 이유로 이미지를 받지 못했다면 대신 에러 메시지를 html 문서에 추가한다.
 * @param pageNum : number
 * @returns {Promise<boolean>}
 */
async function fetchImages(pageNum)  {
    try {
        const response = await fetch(`https://cataas.com/api/cats?limit=6&skip=${6 * pageNum}&width=378&height=378`);

        if(!response.ok) {
            // 네트워크 에러 발생 시, .inf-scroll-section 요소의 하단에 에러 메시지를 추가한다.
            addErrorMessageInInfSection("이미지를 가져오는데 실패했습니다. (네트워크 에러)");
            return false;
        }

        const data = await response.json();
        addImages(data);
    }
    catch(error) {
        // 예상치 못한 에러는 이곳에서 처리한다.
        addErrorMessageInInfSection(error);
        return false;
    }

    return true;
}

// 프로그래머가 예측할 수 있는 (예측 가능한) 에러는 catch가 아닌 try 내에서 처리하는 것이 바람직하다.
// catch 내부는 예측할 수 없는 에러에 대한 처리를 담당한다.

/**
 * .inf-scroll-section 요소 내의 최하단부에 에러 메시지를 추가하는 함수.
 * @param msg : string
 */
function addErrorMessageInInfSection(msg) {
    const inf_scroll_section = document.querySelector(".inf-scroll-section");
    inf_scroll_section.insertAdjacentHTML("beforeend", `<div>${msg}</div>`);
}

/**
 * data로 받은 이미지 정보를 html 문서의 fetched 클래스 요소 및에 추가한다.<br>
 * 이때, 이미지는 3장 단위로 한 줄을 형성해 추가한다.
 * @param data : JSON
 */
function addImages(data) {
    const inf_scroll_fetched = document.querySelector(".fetched");
    let insert_HTML_elem = `<div class="img-line-style">`;

    data.forEach((item, idx) => {
        insert_HTML_elem += `<img src="https://cataas.com/cat/${item._id}?position=centre" alt="">`;

        // 이미지는 한 줄 당 3개씩 넣고 개행
        if(idx === 2 || idx === 5) {
            insert_HTML_elem += `</div>`;
            inf_scroll_fetched.insertAdjacentHTML("beforeend", insert_HTML_elem);
            insert_HTML_elem = `<div class="img-line-style">`;
        }
    })
}

/**
 * scroll 이벤트의 발생 빈도를 조절하는 쓰로틀링 함수.<br>
 * scroll 이벤트 발생 시 실행할 이벤트 헨들러 callback 함수와 발생 빈도를 조절하는 delay 값을 인자로 받는다.<br>
 * return 값으로 이벤트 리스너에 등록할 이벤트 헨들러(익명함수)를 반환한다.
 * @param callback : callback
 * @param delay : number
 * @returns {(function(): void)|*}
 */
function throttle(callback, delay = 500) {
    let timer = undefined;

    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                callback();
                timer = undefined;
            }, delay);
        }
    };
}

/**
 * 현재 스크롤의 위치가 일정 기준선을 넘었다면 <br>
 * 스크롤 위치를 이미지 로딩 직전 위치로 이동시킨 후, 이미지를 로딩한다.
 */
async function resetScrollPosAndFetchImg() {
    const inner_height = window.innerHeight;    // 사용자 화면 높이
    const scroll_top = document.documentElement.scrollTop;  // 현재 사용자의 스크롤 바 위치
    const threshold = document.documentElement.offsetHeight;    // 문서의 총 높이

    const current_height = inner_height + scroll_top;   // 문서 상에서의 사용자 현재 위치

    // 사용자 현재 위치 + 1500 값이 기준선 이상이면
    // 사용자 현재 위치 - 1500 으로 이동시킨 뒤, 이미지를 정보를 받아온다.
    if(current_height + 1500 >= threshold) {
        resetScroll(current_height, 1500);
        await fetchImages(page++);
    }
}

/**
 * 현재 사용자 스크롤 위치를 (current_height - alpha) 위치로 이동시킨다.
 * @param current_height : number
 * @param alpha : number
 */
function resetScroll(current_height, alpha) {
    window.scrollTo({
        top: current_height - alpha,
        behavior: "smooth"
    });
}