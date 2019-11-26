function setDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	if(day < 10) day ='0'+day;
	if(month < 10) month ='0'+month;
	if(hours > 12) hours = '오후 '+(hours-12);
	else hours = '오전 '+hours;
	if(minutes < 10) minutes = '0'+minutes;
	if(seconds < 10) seconds = '0'+seconds;
	
	document.getElementById('nowDate').innerHTML = year+'년 '+month+'월 '+day+'일';
	document.getElementById('nowTime').innerHTML = hours+'시 '+minutes+'분 '+seconds+'초';
}
window.onload = function() {
	setDate();
	playAlert = setInterval(function() {
		setDate();
	}, 1000);
}