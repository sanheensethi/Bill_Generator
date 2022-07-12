status = localStorage.getItem("LoginStatus");
function move(){
	window.location.href='./public/dashboard.html';
}
if("LoginStatus" in localStorage){
	move();
}

