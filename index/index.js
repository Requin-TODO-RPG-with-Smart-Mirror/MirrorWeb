function changeMenu(tag, title, page) {
    document.getElementById('menuList').scrollTop = 0;
    document.getElementById('headerTitle').innerHTML = title;
    if (page == 0) document.getElementById('menuList').style = 'overflow-y: scroll';
    else document.getElementById('menuList').style = 'overflow-y: hidden';

    let list = document.getElementsByClassName('footer_menu_img');
    for (var i = 0; i < list.length; i++) {
        list[i].style['opacity'] = '0.5';
        list[i].style = 'transform: scale(1)';
    }

    let pageList = document.getElementsByClassName('mainMenuList');
    for (var i = 0; i < pageList.length; i++) {
        pageList[i].style = 'transform: translate(' + (-100 * page) + '%,0)';
    }

    tag.style['opacity'] = '1.0';
    tag.style = 'transform: scale(1.25)';
}

if (!localStorage.getItem("access_token")) {
    location.href = "../mini/miniRegister.html";
}