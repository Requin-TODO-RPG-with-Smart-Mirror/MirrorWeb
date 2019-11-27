// const server = "http://10.156.147.139:5555";
const server = "http://192.168.137.1:5555";
const radioText = document.querySelector("#todo_radio_text");
const todoShowList = document.querySelector("#todo_show_li_ul");
const todoInput = document.querySelector("#todo_register_input");
const registerText = document.querySelector("#todo_register_text");
const registerButton = document.querySelector("#todo_register_button > button");
const importantRadio = document.querySelectorAll(".todo_important_radio");
const exp = document.querySelector("#exp");
const socketTodo = io.connect("http://192.168.137.1:5556");

socketTodo.on("get_todo", datas => {
    console.log(datas);
})

function reqTodo(name, num) {
    const date = new Date();
    axios({
        method: "POST",
        url: server + "/todo/register",
        data: {
            "todo_name": name,
            "time": Date.UTC(2019, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
            "important": parseInt(num),
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
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

    })
}

function deleteList(el) {
    axios({
        method: "DELETE",
        url: server + "/todo/register",
        data: {
            "todo_name": el.parentNode.childNodes[3].title,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
        }
    })
    getList();
}

function getList() {
    axios({
        method: "GET",
        url: server + "/todo/register",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(data => {
        todoShowList.innerHTML = "";
        data.data.todo.map(data => {
            createList(data.name, data.important, data.check);
        });
    }).catch(data => {
        console.log(data);
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
        getList();
        setStuff();
    }).catch((data) => {
        console.log(data);
    });
}

function createList(name, important, check) {
    todoShowList.insertAdjacentHTML("beforeend",
        `<li>
        <span class="todo_checkbox ${check 
            ? "todo_checkbox_checked" 
            : "todo_checkbox_nochecked"}" 
            onclick="todoCheck(this);">
        </span>
        <span title="${name}">이름: ${name}</span>
        <span>중요도: ${important}</span>
        <button onclick="deleteList(this);">삭제</button>
    </li>`);
}

function initTodo() {
    todoInput.value = "";
    importantRadio.forEach(el => {
        el.checked = false;
    })
}

registerButton.addEventListener("click", () => {
    let radioCheck = false, inputCheck = false;
    if (todoInput.value.trim() === "") {
        inputCheck = false;
        registerText.classList.add("please_input_list_name");
    } else {
        inputCheck = true;
        registerText.classList.remove("please_input_list_name");
    }
    importantRadio.forEach(el => {
        if (el.checked) radioCheck = el.value;
    });
    !radioCheck
        ? radioText.classList.add("please_check_radio")
        : radioText.classList.remove("please_check_radio");
    if (radioCheck && inputCheck) {
        reqTodo(todoInput.value, radioCheck);
        createList(todoInput.value, radioCheck);
        initTodo();
    }
});

window.onload = () => {
    getList();
    setStuff();
}