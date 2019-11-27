const server = "http://192.168.137.1:5555";
const exp = document.querySelector("#stuff_exp");
const headList = document.querySelector("#stuff_head_list");
const name = document.querySelector("#stuff_name > span");
let headLi;

function getStuff() {
    axios({
        method: "GET",
        url: server + "/mirror/stuff",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((data) => {
        name.innerHTML = data.data.name;
        exp.innerHTML = `내 잔고: ${data.data.exp}원`;
        headList.innerHTML = "";
        data.data.head.forEach(datas => {
            headList.insertAdjacentHTML("beforeend",
                `<li class="stuff_head_list_li">
            <span>${datas}</span>
            <button onclick="setStuff(this);">${datas === data.data.now_head
                    ? "장착됨" : "장착하기"}</button>
        </li>`);
        });
        headLi = document.querySelectorAll(".stuff_head_list_li");
    }).catch((data) => {
    })
}

function setStuff(el) {
    let text = el.parentNode.childNodes[1].textContent;
    axios({
        method: "POST",
        url: server + "/mirror/stuff",
        data: {
            "stuff": text[text.length - 1],
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((data) => {
        headLi.forEach((el) => {
            el.childNodes[3].textContent = "장착하기";
        })
        el.textContent = "장착됨";
    }).catch((data) => {
    })
}

getStuff();