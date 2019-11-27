const server = "http://192.168.137.1:5555";
const sellHead = document.querySelector("#shop_sell_head");
const exp = document.querySelector("#exp");

function getSellItems() {
    axios({
        method: "GET",
        url: server + "/mirror/shop",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((datas) => {
        console.log(datas);
        for(let i = 1; i <= 6; i++) {
            sellHead.insertAdjacentHTML("beforeend",
                `<li>
                <img src="../img/skin/${i}.png" alt="${i}" />
                <p>${i}번 스킨</p>
                <button onclick="buyItems(this);">구매하기</button>
            </li>`);
        }
    }).catch((data) => {
    })
}

function setStuff() {
    axios({
        method: "GET",
        url: server + "/mirror/stuff",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((data) => {
        exp.innerHTML = `내 잔고: ${data.data.exp}원`;
    }).catch((data) => {
        console.log(data);
    })
}

function buyItems(el) {
    axios({
        method: "POST",
        url: server + "/mirror/shop",
        data: {
            "item": el.parentNode.childNodes[1].getAttribute("src").split('/')[3][0],
            "exp": 1,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((datas) => {
        alert("물품을 구매하였습니다.");
    }).catch((datas) => {
        if (data.response.status === 412) {
            alert("이미 가지고 있는 상품입니다.");
            return;
        }
    })
}

getSellItems();
setStuff();