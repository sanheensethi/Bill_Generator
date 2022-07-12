server = `https://shop-billing-software.herokuapp.com`;
sev = `${server}`

function getId(id){
	return document.getElementById(id);
}

function logout(){
	localStorage.removeItem("LoginStatus");
	window.location.href = "../index.html";
}

function downloadBill(billid){
	window.open(`${server}/download/${billid}`) // server address
}

let url = `${server}/totalData`; // server address
let result = apiGET(url);
result.then((data)=>{
	getId("total_bills").value = data.result.length;
	let template = `<div class="table-responsive"><table id="bills" class="table table-hover table-bordered table-striped" style="width:100%">
        <thead class="thead-dark">
            <tr>
                <th>Bill No.</th>
                <th>Mobile Number</th>
                <th>Customer Name</th>
                <th>Bill Amount</th>
                <th>Date Time</th>
                <th>Download</th>
            </tr>
        </thead>
        <tbody>`;
	for(obj of data.result){
		let bill_id = obj.invoice_id;
		let mobile_number = obj.mobile_number;
		let items = JSON.parse(obj.data);
		let customername = obj.customername;
		let date_time = obj.time;
		let date = date_time.split('T')[0];
		let time = date_time.split('T')[1].split('Z')[0].split('.')[0];
		date_time = date + " " + time; 
		console.log(date_time);
		let amount = 0;
		for(it of items.data){
			amount += parseInt(it.amount);
		}
		gstper = 9/100; // 9%
		let totalAmount = 2*(gstper*amount) + amount;
        //  52 -> .toFixed(2)
		template += `
			<tr>
                <td>${bill_id}</td>
                <td>${mobile_number}</td>
                <td>${customername}</td>
                <td>${totalAmount.toFixed(2)}</td>
                <td>${date_time}</td>
                <td><a href='javascript:void(0)' onclick="downloadBill(${bill_id})">Download</a></td>
            </tr>
		`
	}
	template += `
	</tbody>
        <tfoot class="thead-dark">
            <tr>
                <th>Bill No.</th>
                <th>Mobile Number</th>
                <th>Customer Name</th>
                <th>Bill Amount</th>
                <th>Date Time</th>
                <th>Download</th>
            </tr>
        </tfoot>
    </table></div>`;
    getId("data").innerHTML = template;
	$(document).ready(function() {
    	$('#bills').DataTable();
	});
});