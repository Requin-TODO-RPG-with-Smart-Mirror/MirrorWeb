// const server = "http://192.168.137.1:5555";
const server = "http://15.164.230.112:5555"
const miniRegisterInput = document.querySelector("#miniRegister_input");

// 토큰 받고 저장
function registerMirror() {
    axios({
        method: "POST",
        url: server + "/mirror/register/key",
        data: {
            "key": miniRegisterInput.value,
        }
    }).then(data => {
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("mirror_name", miniRegisterInput.value);
        location.href = "mini.html";
    }).catch(data => {
    })
}