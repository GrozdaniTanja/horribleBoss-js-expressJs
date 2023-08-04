function naloziLastnike() {
	let url = 'http://localhost:3000/search/';

	let naziv = document.getElementById("naziv").value;
	let branza = document.getElementById("branza").value;
	let lokacija = document.getElementById("lokacija").value;

	let f = false;

	url = url + '{';
	if (naziv != '') {
		if (!f)
			f = true;
		else
			url = url + ',';
		url = url + '"naziv":"' + naziv + '"';
	}
	if (branza != '') {
		if (!f)
			f = true;
		else
			url = url + ',';
		url = url + '"branza":"' + branza + '"';
	}
	if (lokacija != '') {
		if (!f)
			f = true;
		else
			url = url + ',';
		url = url + '"lokacija":"' + lokacija + '"';
	}

	url = url + '}';
	console.log(url);

	fetch(url, { method: 'GET' })
		.then((odgovor) => {
			return odgovor.json();
		})
		.then((podjetja) => {
			let companies = document.getElementById("companies");

			companies.innerHTML = '';

			for (let i = 0; i < podjetja.length; i++) {
				fetch(`http://localhost:3000/kalk_ocena/${podjetja[i].id}`, { method: 'GET' })
				.then((odgovor) => {
					console.log("odgovor4e");
					console.log(odgovor);
					return odgovor.json();
				})
				.then((odg) => {
					
					if(podjetja[i].opis.length > 50){
						podjetja[i].opis = podjetja[i].opis.substring(0,600);
						podjetja[i].opis = podjetja[i].opis.substring(0,podjetja[i].opis.lastIndexOf('.')+1)+"..";
					}
					
					let info = ' <div class="d-flex flex-column comment-section" id="myGroup">' +
								'<div class="p-2" id="komentari">' +
								'<div class="comment mt-4 text-justify py-3 float-left" style="width:100%; background-color:#fff;"> <img src="data:/images/png;base64,'+podjetja[i].logotip+'" class="rounded-circle" width="40" height="40"  >' +
								'<h4 id="komentator" class="ml-5"> ' + podjetja[i].naziv + '</h4>&nbsp;<br class="d-block d-xl-none">'+'<span id="rating" name="rating"> '+'<li class="fa fa-star" id="o1'+podjetja[i].id+'"></li><li class="fa fa-star" id="o2'+podjetja[i].id+'"></li><li class="fa fa-star" id="o3'+podjetja[i].id+'"></li><li class="fa fa-star"id="o4'+podjetja[i].id+'"><li class="fa fa-star"id="o5'+podjetja[i].id+'"></li></span>'+' <br> <br>' +
								'<p id="vsebina" name="vsebina">' + podjetja[i].opis + '</p>' +
								'<div class="col-sm-3 text-align-center"><a class="btn btn-light" href="company.html?id=' + podjetja[i].id + '">Learn More</a></div>'+
								'</div> ' +
								'</div>'+'</div>';
					companies.innerHTML = companies.innerHTML + info;
					
					console.log("odg4e");
					let oo5 = odg['avg(`ocena`)'];
					//document.getElementById("ocenaOd5").innerHTML=oo5;
					
					document.getElementById("o1"+podjetja[i].id).style.color="rgb(184, 183, 183)";
					document.getElementById("o2"+podjetja[i].id).style.color="rgb(184, 183, 183)";
					document.getElementById("o3"+podjetja[i].id).style.color="rgb(184, 183, 183)";
					document.getElementById("o4"+podjetja[i].id).style.color="rgb(184, 183, 183)";
					document.getElementById("o5"+podjetja[i].id).style.color="rgb(184, 183, 183)";
					switch(Math.round(oo5)){
						case 5:
							document.getElementById("o5"+podjetja[i].id).style.color="#ecb21f";
						case 4:
							document.getElementById("o4"+podjetja[i].id).style.color="#ecb21f";
						case 3:
							document.getElementById("o3"+podjetja[i].id).style.color="#ecb21f";
						case 2:
							document.getElementById("o2"+podjetja[i].id).style.color="#ecb21f";
						case 1:
							document.getElementById("o1"+podjetja[i].id).style.color="#ecb21f"; }
					console.log(odg);

				});
			}
		});
}
/*
function napolniCombobox(){
	let url = 'http://localhost:3000/branzi/';
	
	url=url+'}';
	
	fetch(url, {method: 'GET'})
	.then((odgovor) => {
			return odgovor.json();
		})
	.then((podjetja) => {
			let companies = document.getElementById("companies");
			
			companies.innerHTML = '';
		
			let branza = document.getElementById("branza");
			var obj = JSON.parse(response);

			for (var i=0; i < obj.States.length; i++){
				var option = document.createElement("option");
				option.id = obj.States[i].id;
				option.value = obj.States[i].code;
				option.innerHTML = obj.States[i].stateName;
				branza.appendChild(option);
			}
		})
}
*/
document.getElementById("forma")
	.addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("submit").click();
		}
	});

let queryString = window.location.search;
if (queryString) {
	queryString = queryString.substring(1);
	queryString = queryString.replaceAll('%22', '"');
	queryString = queryString.replaceAll('%20', ' ');
	console.log(queryString);
	queryString = JSON.parse(queryString);
	console.log('c');
	console.log(queryString);
	if (queryString.naziv) {
		document.getElementById("naziv").value = queryString.naziv;
	}
	if (queryString.branza) {
		document.getElementById("branza").value = queryString.branza;
	}
	if (queryString.lokacija) {
		document.getElementById("lokacija").value = queryString.lokacija;
	}
}
naloziLastnike();
//TODO: lokacija set on object

/*
$(function() {
	$('form').each(function() {
		$(this).find('input').keypress(function(e) {
			// Enter pressed?
			if(e.which == 10 || e.which == 13) {
				naloziLastnike();
				//this.form.submit();
			}
		});

		$(this).find('input[type=submit]').hide();
	});
});
*/
