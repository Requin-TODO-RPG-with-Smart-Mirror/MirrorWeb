// 민기 서버 주소
// const server = "http://10.156.147.139:5555";
// const server = "http://192.168.137.1:5555";
const server = "http://15.164.230.112:5555"
// 민기 소켓 주소
const mirror = io.connect("http://15.164.230.112:5556");
const miniName = document.querySelector("#mini_name");

function createCharacter(name) {
    axios({
        method: "POST",
        url: server + "/mirror/register/char",
        data: {
            "name": miniName.value,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(data => {
        location.href = "../index/index.html";
    }).catch(data => {
        alert("실패");
    })
}