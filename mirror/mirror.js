// const mirror = io.connect("http://192.168.137.1:5556");
const mirror = io.connect("http://15.164.230.112:5556");
const box = document.querySelector("#box");
const char = document.getElementById("char");
const crownBoy = document.getElementById("crownBoy");

mirror.on("register_char", datas => {
    console.log(datas);
})

function IsBoxOver(moveBy) {
    let left = box.offsetLeft;
    if ((moveBy > 0 && left > 900) || (moveBy < 0 && left < 500)) {
        return true;
    } else {
        return false;
    }
}

function moveBoxSideToSide(move) {
    box.style.left = `${parseFloat(getComputedStyle(box).left) + move}px`;
}

function moveBoxUpAndDown(move) {
    let bottom = parseFloat(getComputedStyle(box).bottom);
    box.style.bottom = `${bottom + move}px`;
    setTimeout(() => {
        box.style.bottom = "0px";
    }, 300);
}

function moveStart() {
    let forward;
    let side = Math.round(Math.random() * 100) + 200;
    let up = Math.round(Math.random() * 10) + 50;
    forward = up % 2 || -1;
    if (forward == 1) {
        if (parseFloat(getComputedStyle(box).left) > 500) {
            moveBoxSideToSide(side * forward * -1);
            changeCrownBoy("Left", "Right");
        } else {
            moveBoxSideToSide(side * forward);
            changeCrownBoy("Right", "Left");
        }
    } else {
        if (parseFloat(getComputedStyle(box).left) < 100) {
            moveBoxSideToSide(side * forward * -1);
            changeCrownBoy("Right", "Left");
        } else {
            moveBoxSideToSide(side * forward);
            changeCrownBoy("Left", "Right");
        }
    }
    side % 5 === 0 ? moveBoxUpAndDown(up) : "";
}

function changeCrownBoy(img1, img2) {
    document.getElementById(`crownBoy${img1}`).style.display = "inline-block";
    document.getElementById(`crownBoy${img2}`).style.display = "none";
}
