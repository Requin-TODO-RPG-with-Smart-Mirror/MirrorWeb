// const server = "http://10.156.147.139:5555";
const newListDate = document.querySelector("#newListDate");
const newListTitle = document.querySelector("#newListTitle");
const newListButton = document.querySelector("#newListButton");
const newListImportant = document.getElementsByName("newListImportant")[0].children;

function reqTodo(name, num) {
    let date = newListDate.value.split('-');
    let utc = Date.UTC(date[0], date[1], date[2]);
    axios({
        method: "POST",
        url: server + "/todo/register",
        data: {
            "todo_name": name,
            "time": utc,
            "important": num,
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })
}

function initTodo() {
    newListTitle.value = "";
    newListDate.value = "";
}

newListButton.addEventListener("click", () => {
    let dateCheck = false, inputCheck = false, important = 1;
    if (newListTitle.value.trim() === "") {
        inputCheck = false;
    } else {
        inputCheck = true;
    }
    let date = newListDate.value.split('-');
    if (date[0] === "") {
        dateCheck = false;
    } else {
        dateCheck = true;
    }
    
    [...newListImportant].forEach(data => {
        if (data.selected) {
            important = data.innerHTML;
        }
    });

    switch (important) {
        case "중요":
            important = 3;
            break;
        case "보통":
            important = 2;
            break;
        case "낮음":
            important = 1;
            break;
        default:
            break;
    }

    if (dateCheck && inputCheck) {
        reqTodo(newListTitle.value, important);
        initTodo();
    } else {
        alert("다시 확인해주세요.");
        return;
    }
});