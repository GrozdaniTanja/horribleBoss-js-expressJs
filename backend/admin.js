function izbrisiLastnishtvo(id){
    fetch(`http://localhost:3000/izbrisiLastnishtvo/${id}`, {method: 'DELETE'})
    .then((odgovor) => { location.reload(); });
}

function fixproofs() {
    let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
	let user_id = prijavljen.id; //TODO: seesion storage
	console.log("1");
    fetch('http://localhost:3000/lastnistvo/'+user_id, {method: 'GET'})
    .then((odgovor) => {return odgovor.json();})
    .then((proof) => { 
        let tabela = document.getElementById("proofs");
		if(proof == "Not admin"){
			tabela.innerHTML = `ADMINISTRATOR SEGMENT DENIED`;	
			return;
		}
		console.log("2");
        tabela.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Proof</th>
            <th>CompanyName</th>
            <th></th>
        </tr>
        `;
		console.log("3");
		console.log(proof);

		let flag = true;
        for(let p of proof){
			if(!p.odobritev){
				flag=false;
		console.log(p);
            let vrstica = tabela.insertRow(-1);
			
			let polje1 = vrstica.insertCell();
			let polje2 = vrstica.insertCell();
			fetch('http://localhost:3000/en_uporabnik/'+p.uporabnik_id, {method: 'GET'})
			.then((odgovor1) => {return odgovor1.json();})
			.then((odgovor2) => {
				odgovor2=odgovor2[0];
				polje1.innerHTML = odgovor2.ime;
				polje2.innerHTML = odgovor2.priimek;
			});
			
			let polje3 = vrstica.insertCell();
			polje3.innerHTML = `<img height="200" src="data:image/jpg;base64,${p.slika}">`;			
			
			let polje5 = vrstica.insertCell();
			fetch('http://localhost:3000/l_podjetje/'+p.podjetje_id, {method: 'GET'})
			.then((odgovor1) => {return odgovor1.json();})
			.then((odgovor2) => {
				odgovor2=odgovor2[0];
				polje5.innerHTML = odgovor2.naziv;
			});
			
			let polje6 = vrstica.insertCell();
			polje6.innerHTML = `<form method='post' action='http://localhost:3000/odobritiLastnistvo' enctype="multipart/form-data"><button action="submit" onclick="refresh()" class="btn btn-success")>Approve</button><input type="hidden" id="lastnost_id" name="lastnost_id" value="${p.id}"></form> <button onclick="izbrisiLastnishtvo(${p.id});" class="btn btn-danger mt-2")>Reject</button>`;
			}
        }
        if(flag){
			let msg = document.getElementById("msg");
			msg.innerHTML = `All requests answered`;
			tabela.innerHTML = `<div style="margin:auto;"><img width="100%" src="../public/images/vacation.jpg"></div>`;	
		}
		console.log("4");
	});
}

function refresh(){
    setTimeout(function(){
        window.location.reload();
    },500)
}

fixproofs();
