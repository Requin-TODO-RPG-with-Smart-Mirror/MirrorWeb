// const server = "http://192.168.137.1:5555";
const server = "http://15.164.230.112:5555"
const todoList = document.querySelector("#toDoList");
const importantLow = document.querySelector("#important_low");
const importantHigh = document.querySelector("#important_high");
const importantNormal = document.querySelector("#important_normal");
// const socketTodo = io.connect("http://192.168.137.1:5556");
const socketTodo = io.connect("http://15.164.230.112:5556");

socketTodo.on("get_todo", datas => {
    datas.todo.map((data) => {
        getList();
    })
})

function deleteList(el) {
    axios({
        method: "DELETE",
        url: server + "/todo/register",
        data: {
            "todo_name": el.parentNode.childNodes[3].textContent,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
        }
    })
}

function getList( ) {
    axios({
        method: "GET",
        url: server + "/todo/register",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(datas => {
        importantHigh.innerHTML = "<button>중요도 높음</button>";
        importantNormal.innerHTML = "<button>중요도 중간</button>";
        importantLow.innerHTML = "<button>중요도 낮음</button>";

        datas.data.todo.map(data => {
            createList(data.name, data.check, data.important, data.time);
        });
    }).catch(datas => {
    });
}

function todoCheck(el) {
    axios({
        method: "POST",
        url: server + "/todo/check",
        data: {
            "todo_name": el.parentNode.childNodes[3].title,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(() => {
        deleteList(el); 
        getList();
    }).catch((data) => {
    });
}

function createList(name, check, important, time) {
    let date = new Date(time);
    switch (important) {
        case 1:
            importantLow.insertAdjacentHTML("beforeend",
                `<div class="${ check ? "willDeleted" : "" }">
                <img src="img/${check
                    ? "check"
                    : "unCheck"}.png" 
                    onclick="todoCheck(this);"/>
                <p title="${name}">${name}</p>
                <button class="todoListDeleteButton" onclick="deleteList(this);">삭제</button>
                <p class="todoListTime">
                    ${date.getFullYear()}년
                    ${date.getMonth()}월
                    ${date.getDate()}일
                </p>
            </div>`);
            break;
        case 2:
            importantNormal.insertAdjacentHTML("beforeend",
                `<div class="${ check ? "willDeleted" : "" }">
                <img src="img/${check
                    ? "check"
                    : "unCheck"}.png"
                    onclick="todoCheck(this);" />
                <p title="${name}">${name}</p>
                <button class="todoListDeleteButton" onclick="deleteList(this);">삭제</button>
                <p class="todoListTime">
                    ${date.getFullYear()}년
                    ${date.getMonth()}월
                    ${date.getDate()}일
                </p>
            </div>`);
            break;
        case 3:
            importantHigh.insertAdjacentHTML("beforeend",
                `<div class="${check ? "willDeleted" : "" }">
                <img src="img/${check
                    ? "check"
                    : "unCheck"}.png"
                    onclick="todoCheck(this);" />
                <p title="${name}">${name}</p>
                <button class="todoListDeleteButton" onclick="deleteList(this);">삭제</button>
                <p class="todoListTime">
                    ${date.getFullYear()}년
                    ${date.getMonth()}월
                    ${date.getDate()}일
                </p>
            </div>`);
            break;
        default:
            break;
    }
}

window.onload = () => {
    getList();
}