const myExp = document.querySelector("#myExp");
const myChar = document.querySelector("#myChar");
const myMoney = document.querySelector("#myMoney");
const userName = document.querySelector("#userName");
const itemList = document.querySelector("#itemList");
const userLevel = document.querySelector("#myLevel");
let shopItem;

function setUserChar(el) {
    let skinNum = el.getAttribute("src").split("-");
    skinNum[1] === "0"
        ? skinNum = skinNum[1] + "-" + skinNum[2]
        : skinNum = skinNum[1];

    myChar.setAttribute("src", `img/skin/skin-${skinNum}`);
    axios({
        method: "POST",
        url: server + "/mirror/stuff",
        data: {
            "stuff": `skin-${skinNum.split('.')[0]}`,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(datas => {
    }).catch(datas => {
    });
}

function getUserInfo() {
    axios({
        method: "GET",
        url: server + "/mirror/stuff",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(datas => {
        let obj = datas.data;
        console.log(obj);
        itemList.innerHTML = "";
        
        obj.stuff.forEach(data => {
            itemList.insertAdjacentHTML("beforeend",
                `<img class="shopItem" onclick="setUserChar(this)" 
                src="img/skin/${data}.png">`);
        });
        userName.innerHTML = obj.name;
        userLevel.innerHTML = `level: ${obj.level}`;
        myMoney.innerHTML = `Money: ${obj.money}`;
        myExp.innerHTML = `Exp: ${obj.exp}`;
        myChar.setAttribute("src", `img/skin/${obj.now_skin}.png`);
    }).catch(datas => {
    });
}