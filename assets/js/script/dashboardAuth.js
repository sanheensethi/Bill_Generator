server = `https://shop-billing-software.herokuapp.com`;
sev = `${server}`
status = localStorage.getItem("LoginStatus");
function move(){
	window.location.href='../index.html';
}
if("LoginStatus" in localStorage){
	let loginAuth = JSON.parse(status);
	// console.log(loginAuth);
	user_id = loginAuth.id;
	user_name = loginAuth.username;
	data = {
		userid:user_id,
		username:user_name
	};

	url = `${server}/auth`; // server address
	let result = apiPOST(url,data);
	result.then((data)=>{
		// console.log(data);
		if(data.status == 404){
			//console.log("Hello");
			localStorage.removeItem("LoginStatus");
			move();
		}
	})

}else{
	move();
}