const shopBuyButton = document.querySelectorAll(".shopBuyButton");
const mypageItemList = document.querySelector("#itemList");

function buyItems(i) {

    axios({
        method: "POST",
        url: server + "/mirror/shop",
        data: {
            "skin": `skin-${i}`,
            "money": 10 ,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((datas) => {
        alert("물품을 구매하였습니다.");
    }).catch((datas) => {
        if (datas.response.status === 412) {
            alert("이미 가지고 있는 상품입니다.");
            return;
        }
        if (datas.response.status === 403) {
            alert("돈이 부족합니다.");
            return;
        }
    })
}   

shopBuyButton.forEach((el, i) => {
    el.addEventListener("click", () => {
        buyItems(el.parentNode.children[0].getAttribute("src").split('-')[1][0]);
    })
})