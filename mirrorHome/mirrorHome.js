// const server = "http://192.168.137.1:5555";
const server = "http://15.164.230.112:5555"
const socketTodo = io.connect("http://15.164.230.112:5556");
const userExp = document.querySelector("#userExp");
const userName = document.querySelector("#userName");
const userLevel = document.querySelector("#userLevel");
const userMoney = document.querySelector("#userMoney");
const questRest = document.querySelector("#quest_rest");
const crownBoyLeft = document.querySelector("#crownBoyLeft");
const crownBoyRight = document.querySelector("#crownBoyRight");
const questListUl = document.querySelector("#quest_list > ul");
const temp = document.querySelector("#temp");
const weather = document.querySelector("#weather > img");

function setDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours > 12) hours = '오후 ' + (hours - 12);
    else hours = '오전 ' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    document.getElementById('nowDate').innerHTML = year + '년 ' + month + '월 ' + day + '일';
    document.getElementById('nowTime').innerHTML = hours + '시 ' + minutes + '분 ' + seconds + '초';
}

function setWeather() {
    var xmlData;
    axios({
        method: "GET",
        url: "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1168066000",
    }).then(data => {
        xmlData = data;
    }).catch(data => {
    });
}

function createList(name, important) {
    let im;
    if (important === 3) im = "상";
    else if (important === 2) im = "중";
    else im = "하";
    questListUl.insertAdjacentHTML("beforeend",
        `<li>
        <h1>${name}</h1>
        <div>
            <p>${im}</p>
            <p>11/26일까지</p>
        </div>
    </li>`);
}

function getList() {
    axios({
        method: "GET",
        url: server + "/todo/register",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(data => {
        questListUl.innerHTML = "";
        for (let i = 0; i < data.data.todo.length - 1; i++) {
            for (let j = i; j >= 0; j--) {
                if (data.data.todo[j].important < data.data.todo[j + 1].important) {
                    let temp = data.data.todo[j];
                    data.data.todo[j] = data.data.todo[j + 1];
                    data.data.todo[j + 1] = temp;
                }
            }
        }
        data.data.todo.map((datas, i) => {
            if (i <= 3) createList(datas.name, datas.important, datas.time);
        });
    }).catch(data => {
    });
}

function showRestQuest() {
    axios({
        method: "GET",
        url: server + "/todo/register"
    }).then(datas => {
        let len = datas.data.todo.length;
        if (len >= 4) questRest.innerHTML = `4/${len}`;
        else questRest.innerHTML = `${len}/${len}`;
    }).catch(datas => {
    });
}

function initMirror() {
    let rand = 1500;
    setInterval(() => {
        rand = Math.round(Math.random() * 200) + 900;
        moveStart();
    }, rand);
    setDate();
    getList();
    showRestQuest();
    playAlert = setInterval(() => {
        setDate();
    }, 1000);
}

function getWeather() {
    axios({
        method: "GET",
        url: server + "/weather",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then((datas) => {
        let getWt = datas.data.weather.split("<wfKor>")[1].split("<")[0];
        let getTemp = datas.data.weather.split("<temp>")[1];
        temp.innerHTML = "온도: " + getTemp[0] + getTemp[1] + getTemp[2];
        if (getWt === "맑음") {
            weather.setAttribute("src", "../img/sunny.png");
        } else if (getWt === "흐림") {
            weather.setAttribute("src", "../img/weather.png");
        } else {
            weather.setAttribute("src", "../img/drop.png");
        }
    })
}

socketTodo.on("get_todo", datas => {
    for (let i = 0; i < datas.todo.length - 1; i++) {
        for (let j = i; j >= 0; j--) {
            if (datas.todo[j].important < datas.todo[j + 1].important) {
                let temp = datas.todo[j];
                datas.todo[j] = datas.todo[j + 1];
                datas.todo[j + 1] = temp;
            }
        }
    }
    let i = 0;
    questListUl.innerHTML = "";
    datas.todo.map((data) => {
        if (i <= 3) {
            createList(data.name, data.important, data.time);
            i++;
        }
    })
    showRestQuest();
})

socketTodo.emit("register", { "key": localStorage.getItem("mirror_name") });

// 초기화
socketTodo.on("register_char", datas => {
    let skinNum;
    skinNum = datas.skin === "skin-0"
        ? skinNum = datas.skin + "-" + datas.level
        : skinNum = datas.skin
    crownBoyLeft.setAttribute("src", `../index/img/skin/${skinNum}.png`);
    crownBoyRight.setAttribute("src", `../index/img/skin/${skinNum}.png`);
    userName.innerHTML = datas.name;
    userLevel.innerHTML = `LEVEL: ${datas.level}`;
    userExp.innerHTML = `EXP: ${datas.exp}`;
    userMoney.innerHTML = `MONEY: ${datas.money}`;
    getWeather();
    initMirror();
})

socketTodo.on("get_look", (datas) => {
    crownBoyLeft.setAttribute("src", `../index/img/skin/${datas.skin}.png`);
    crownBoyRight.setAttribute("src", `../index/img/skin/${datas.skin}.png`);
})
