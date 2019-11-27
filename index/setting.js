function logout() {
    localStorage.removeItem("access_token");
    alert("로그아웃하였습니다.");
}