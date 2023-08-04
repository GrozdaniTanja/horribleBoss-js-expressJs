var atmosfera = 0;
var balance = 0;
var organization = 0;
var diff = 0;

let isOwner = false;

let hasSubmitedAnOwnershipRequest = false;

let imaloadirano = false;

let prijavljen;

const b=[
    'Choose...',
    'Science & Technology',
    'Fashion & Design',
    'Food & Beverage',
    'Transport & Utilities',
    'Law services',
    'Furniture & Housing',
    'Arts, culture and entertainment',
    'Education',
    'Installation and maintenance',
    'Business and administration'
];

function naloziPodjetje() {
    //console.log("halo");
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    console.log(prijavljen);
	
	if(prijavljen != null)
		document.getElementById('uporabnik_id').value = prijavljen.id;
	document.getElementById('podjetje_id').value = id;
	
	//console.log('vvvvv');
    if(prijavljen!=null){
    fetch('http://localhost:3000/isOwner/' +  prijavljen.id + "|" + id, { method: 'GET' })
        .then((odgovor1) => { 
            return odgovor1.json(); })
        .then((odgovor2) => {
			if(odgovor2.length > 0){
				hasSubmitedAnOwnershipRequest = true;
				odgovor2 = odgovor2[0];
				if(odgovor2 !== undefined)
					isOwner = odgovor2.odobritev;
			}
			console.log(hasSubmitedAnOwnershipRequest);
			console.log(isOwner);
        });
    }
    
    fetch(`http://localhost:3000/kalk_ocena/${id}`, { method: 'GET' })
        .then((odgovor) => {
            //console.log("odgovor4e");
            //console.log(odgovor);
            return odgovor.json();
        })
        .then((odg) => {
            //console.log("odg4e");
            let oo5 = odg['avg(`ocena`)'];
			
			document.getElementById("oo51").style.color="rgb(184, 183, 183)";
			document.getElementById("oo52").style.color="rgb(184, 183, 183)";
			document.getElementById("oo53").style.color="rgb(184, 183, 183)";
			document.getElementById("oo54").style.color="rgb(184, 183, 183)";
			document.getElementById("oo55").style.color="rgb(184, 183, 183)";
			if(oo5 === null){
				document.getElementById("ocenaOd5").innerHTML='0';
			}else{
				document.getElementById("ocenaOd5").innerHTML=oo5;
				
				switch(Math.round(oo5)){
					case 5:
						document.getElementById("oo55").style.color="#ecb21f";
					case 4:
						document.getElementById("oo54").style.color="#ecb21f";
					case 3:
						document.getElementById("oo53").style.color="#ecb21f";
					case 2:
						document.getElementById("oo52").style.color="#ecb21f";
					case 1:
						document.getElementById("oo51").style.color="#ecb21f"; }
				//console.log(odg);
			}
        });
	if(!imaloadirano){
		imaloadirano=true;
    fetch(`http://localhost:3000/en_podjetje/${id}`, { method: 'GET' })
        .then((odgovor) => {
            //console.log(odgovor);
            return odgovor.json();
        })
        .then((podjetje) => {
            //console.log(podjetje);
            if (podjetje.naziv == undefined) {
                window.location.href = "index.html";
                return;
            }
            let logo_strana = document.getElementById("logotip");
            //console.log(podjetje.logotip);
            logo_strana.src = "data:/images/png;base64," + podjetje.logotip;

            let h1_naslov = document.getElementById("naziv");
            h1_naslov.innerHTML = h1_naslov.innerHTML+podjetje.naziv;

            let opis = document.getElementById("opis");
            opis.innerHTML =  podjetje.opis;
			
            let branzha = document.getElementById("branzha");
            branzha.innerHTML = branzha.innerHTML + ' ' + b[podjetje.branza_id];

            let span_lokacija = document.getElementById("lokacija");
            span_lokacija.innerHTML = span_lokacija.innerHTML + ' ' + podjetje.lokacija;
            //console.log(span_lokacija);




            var polje = ['Mura',
                'Drava',
                'Carinthia',
                'Savinja',
                'Central Sava',
                'Lower Sava',
                'Southeast Slovenia',
                'Carniola',
                'Central Slovenia',
                'Upper Carniola',
                'Gorizia',
                'Coastal-Karst'];

            var latitud = ['46.68',
                '46.42',
                '46.57',
                '46.26',
                '46.12',
                '45.93',
                '45.57',
                '45.71',
                '46.08',
                '46.42',
                '45.96',
                '45.53'];

            var longitud = ['16.20',
                '15.47',
                '15.13',
                '15.26',
                '15.1',
                '15.52',
                '15.1',
                '14.54',
                '14.53',
                '14.11',
                '13.64',
                '13.7'];


            let lat = latitud[polje.indexOf(podjetje.lokacija)];
            let lon = longitud[polje.indexOf(podjetje.lokacija)];
            mapboxgl.accessToken = 'pk.eyJ1IjoidGFuamFnMDUiLCJhIjoiY2twcXVlbnc1MDVwZTJxcDFrbHdkZmNiNSJ9.4x14hJef1nBZVUEBvx_RXA';
            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lon, lat], // starting position
                zoom: 9 // starting zoom
            });

            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());




            let span_telefon = document.getElementById("telefon");
            span_telefon.innerHTML =  span_telefon.innerHTML + ' ' +podjetje.telefon;

            let span_email = document.getElementById("email");
            span_email.innerHTML =span_email.innerHTML + ' ' + podjetje.email;

            let span_web = document.getElementById("spletnaStran");
            span_web.innerHTML = span_web.innerHTML + ' ' +podjetje.spletnaStran;

            let span_linkedin = document.getElementById("socialnePovezave");
            span_linkedin.innerHTML =  span_linkedin.innerHTML + ' ' +podjetje.socialnePovezave;

            let span_employerss = document.getElementById("velikostPodjetja");
            span_employerss.innerHTML = span_employerss.innerHTML + ' ' +podjetje.velikostPodjetja;
        })
	}

    fetch(`http://localhost:3000/komentar/${id}`, { method: 'GET' })
        .then((odgovor) => {
            return odgovor.json();
        })
        .then((komentari) => {
			console.log(komentari=='');
			if(komentari=='')
				hideRestricted();
			console.log('here,,.');
            let z = document.getElementById("formakom");
            let kom = document.getElementById("komentari");
            kom.innerHTML = "";
            for (let k = 0; k < komentari.length; ++k) {
				if(prijavljen !== null)
					if (prijavljen.id == komentari[k].uporabnik_id)
						z.style.display = 'none';
                //console.log(komentari[k].vsebina);
                let odgovorString = '';
				console.log(komentari[k]);
                if (komentari[k].odgovor !== null) {
                    odgovorString = komentari[k].odgovor;
                }

                //console.log("2efdfd"+komentari[k].uporabnik_id);
                fetch('http://localhost:3000/en_uporabnik/' + komentari[k].uporabnik_id, { method: 'GET' })
                    .then((odgovor1) => { return odgovor1.json(); })
                    .then((odgovor2) => {
                        //console.log(odgovor2);
                        odgovor2 = odgovor2[0];
                        
                        let a = ' <div class="d-flex flex-column comment-section" id="myGroup">' +
                            '<div class="bg-white p-2" id="komentari">' +
                            '<div class="comment mt-4 text-justify float-left" style="width:100%"> <img src="https://eu.ui-avatars.com/api/?background=fff&color=ecb21f&name=' + odgovor2.ime + "+" + odgovor2.priimek + '" class="rounded-circle mt-2" width="40" height="40" style="box-shadow: 0px 0px 5px #BBBBBB;">' +
                            '<h4 id="komentator">&nbsp;&nbsp;&nbsp;&nbsp;' + odgovor2.ime + " " + odgovor2.priimek + '</h4>&nbsp;<br class="d-block d-xl-none"><small> <span id="datum" name="datum"> ' + komentari[k].datum + ' </span></small><span id="rating"  value= "' + komentari[k].ocena + '" name="rating"> '+
                            '<br class="d-block d-xl-none"><li class="fa fa-star" id="o1'+komentari[k].id+'"></li><li class="fa fa-star" id="o2'+komentari[k].id+'"></li><li class="fa fa-star" id="o3'+komentari[k].id+'"></li><li class="fa fa-star"id="o4'+komentari[k].id+'"><li class="fa fa-star"id="o5'+komentari[k].id+'"></li></span> <br> <br>' +
                            '<p id="vsebina" name="vsebina">' + komentari[k].vsebina + '</p>' +
                            '<div class="d-flex flex-row fs-12">';
							
							if(isOwner)
								a = a +
									`<div class="like p-2 cursor action-collapse replyKomentar" style="display:none;" data-toggle="collapse" aria-expanded="true" aria-controls="collapse-`+komentari[k].id+`" href="#collapse-`+komentari[k].id+`"><i class="fa fa-commenting-o" ></i><span  id="replyBtn${komentari[k].id}">Reply</span></div>`;
							
							a = a +
								`<div class="like p-2 cursor deleteKomentar" style="display:none;" aria-expanded="true"><i class="fa fa-trash"></i><span class="ml-1" onclick="izbrisiKomentar(${komentari[k].id})">Remove</span></div>`;
                            
							if(isOwner && (odgovorString !== ''))
								a = a +`</div>` +
									'<div id="collapse-'+komentari[k].id+'" class="bg-white p-2 collapse show" data-parent="#myGroup">' +
									'<div class="d-flex flex-row align-items-start" ><img style="box-shadow: 0px 0px 5px #BBBBBB; background-color:#fff;" class="rounded-circle" src="images/owner.png" width="40" height="40"><textarea class="form-control ml-1 shadow-none textarea"  placeholder="answer" id="reply' + komentari[k].id + '" name="replaykom">'+odgovorString+'</textarea></div>' +
									'<div class="mt-2 text-right"><button value="Enter" type="button" id="post" id="odgovorsubmitbtn' + komentari[k].id + '" onclick="postOdgovor(' + komentari[k].id + ')">Save</button>' +
									'</div>' +
									'</div>' +
									'</div>' +
									'</div> ' +
									'</div>';
							else if(isOwner && (odgovorString == ''))
								a = a +`</div>` +
									'<div id="collapse-'+komentari[k].id+'" class="bg-white p-2 collapse" data-parent="#myGroup">' +
									'<div class="d-flex flex-row align-items-start" ><img style="box-shadow: 0px 0px 5px #BBBBBB; background-color:#fff;" class="rounded-circle" src="images/owner.png" width="40" height="40"><textarea class="form-control ml-1 shadow-none textarea"  placeholder="answer" id="reply' + komentari[k].id + '" name="replaykom">'+odgovorString+'</textarea></div>' +
									'<div class="mt-2 text-right"><button value="Enter" type="button" id="post" id="odgovorsubmitbtn' + komentari[k].id + '" onclick="postOdgovor(' + komentari[k].id + ')">Save</button>' +
									'</div>' +
									'</div>' +
									'</div>' +
									'</div> ' +
									'</div>';
							else if(odgovorString !== '')
								a = a +`</div>` +
									'<div class="bg-white p-2" data-parent="#myGroup">' +
									'<div class="d-flex flex-row align-items-start" ><img style="box-shadow: 0px 0px 5px #BBBBBB; background-color:#fff;" class="rounded-circle" src="images/owner.png" width="40" height="40"><textarea class="form-control ml-1 shadow-none textarea"  placeholder="answer" id="reply' + komentari[k].id + '" name="replaykom" style="background-color:#fff;" disabled >'+odgovorString+'</textarea></div>' +
									'</div>' +
									'</div>' +
									'</div> ' +
									'</div>';
						
						kom.innerHTML=kom.innerHTML+a;
                            document.getElementById("o1"+komentari[k].id).style.color="rgb(184, 183, 183)";
                            document.getElementById("o2"+komentari[k].id).style.color="rgb(184, 183, 183)";
                            document.getElementById("o3"+komentari[k].id).style.color="rgb(184, 183, 183)";
                            document.getElementById("o4"+komentari[k].id).style.color="rgb(184, 183, 183)";
                            document.getElementById("o5"+komentari[k].id).style.color="rgb(184, 183, 183)";
                            switch(komentari[k].ocena){
                                case 5:
                                    document.getElementById("o5"+komentari[k].id).style.color="#ecb21f";
                                case 4:
                                    document.getElementById("o4"+komentari[k].id).style.color="#ecb21f";
                                case 3:
                                    document.getElementById("o3"+komentari[k].id).style.color="#ecb21f";
                                case 2:
                                    document.getElementById("o2"+komentari[k].id).style.color="#ecb21f";
                                case 1:
                                    document.getElementById("o1"+komentari[k].id).style.color="#ecb21f"; 
							}
                        if(k == komentari.length-1)
                            hideRestricted();
                    });
                    //console.log('ne JAJSFDS');
                }    
                //console.log('ne krashnav top sum');
            
        });
}

function postSe() {
    //console.log('Ocena: ' + Number(atmosfera) + ' ' + Number(diff) + ' ' + Number(balance) + ' ' + Number(organization));
    var x = ((Number(atmosfera) + Number(diff) + Number(balance) + Number(organization)) / 4);
    var w = document.getElementById("tekst").value;

    var url_string = window.location.href;
    var url = new URL(url_string);
    var podjetje_id = url.searchParams.get("id");
	
	var a = { ocena: x, vsebina: w, podjetje_id: podjetje_id, uporabnik_id: prijavljen.id };
	console.log('a');
	console.log(a);
	
    $.ajax({
        url: "http://localhost:3000/komentar",
        data: { ocena: x, vsebina: w, podjetje_id: podjetje_id, uporabnik_id: prijavljen.id },
        type: 'POST',
        success: function (data, status) {
        }
    });
}

function postOdgovor(idZemeno) {
	console.log('mar');
    //var p = document.getElementById("editreply" + idZemeno).value;
    p = document.getElementById("reply" + idZemeno).value;
    //showbtn(idZemeno);

    $.ajax({
        url: "http://localhost:3000/dodajOdgovor",
        data: { id: idZemeno, odgovor: p },
        type: 'POST',
        success: function (data, status) {
        }
    });
}

function izbrisiKomentar(id) {
    fetch(`http://localhost:3000/izbrisiKomentar/${id}`, { method: 'DELETE' })
        .then((odgovor) => {
            //console.log('3');
			//TODO OVAAA
            naloziPodjetje();
            //location.reload();
        });
}


function refresh() {
    setTimeout(function () {
        window.location.reload();
    }, 500)
}

function kompanijadodadena() {
    setTimeout(function () {
        //alert('Company added s!');
        window.location.href = "search.html";
    }, 500)
}

function kompanijaeditirana() {
    setTimeout(function () {
        //alert('Kompanija dodadena!');
        window.location.href = "search.html";
    }, 500)
}

function hideRestricted() {
	
    console.log(isOwner);
    if (isOwner) {
		let editCompanyBtn = document.getElementById("editCompanyBtn");
		editCompanyBtn.style.display = "block";
    }
    
    console.log('['+!hasSubmitedAnOwnershipRequest+']');
    if (!hasSubmitedAnOwnershipRequest) {
		console.log("good");
		let takeOwnership = document.getElementById("takeOwnership");
		takeOwnership.style.display = "block";
    }
	
    console.log("hr");
    const prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    //console.log("iiio");
    //console.log(prijavljen);

    const allKomentariReply = document.querySelectorAll('.replyKomentar');
    const allKomentariDelete = document.querySelectorAll('.deleteKomentar');
    
    if (prijavljen != null) {
        if (prijavljen.admin == 1) {
            allKomentariDelete.forEach(itt => itt.style.display = 'inline');
        }
    }
    
    console.log(isOwner);
    if (isOwner) {
        allKomentariReply.forEach(itt => itt.style.display = 'inline');
    }
    
}


function showbtn(id) {

    let show = document.getElementById("reply" + id);
    let show2 = document.getElementById("editreply" + id);
    let odgovorsubmitbtn = document.getElementById("odgovorsubmitbtn" + id);

    if (show.style.display == 'inline-block') {
        show.style.display = 'none';
        show2.style.display = 'inline-block';
        odgovorsubmitbtn.style.display = 'inline-block';
    } else {
        show.style.display = 'inline-block';
        show2.style.display = 'none';
        odgovorsubmitbtn.style.display = 'none';
    }
};

function setDiff(odgovor){
    diff=odgovor;
    rating_d1.style.color="black";
    rating_d2.style.color="black";
    rating_d3.style.color="black";
    rating_d4.style.color="black";
    rating_d5.style.color="black";
    switch(odgovor){
        case 5:
            rating_d5.style.color="#ecb21f";
        case 4:
            rating_d4.style.color="#ecb21f";
        case 3:
            rating_d3.style.color="#ecb21f";
        case 2:
            rating_d2.style.color="#ecb21f";
        case 1:
            rating_d1.style.color="#ecb21f";
    }
}
function setOrganization(odgovor){
    organization=odgovor;
    rating_o1.style.color="black";
    rating_o2.style.color="black";
    rating_o3.style.color="black";
    rating_o4.style.color="black";
    rating_o5.style.color="black";
    switch(odgovor){
        case 5:
            rating_o5.style.color="#ecb21f";
        case 4:
            rating_o4.style.color="#ecb21f";
        case 3:
            rating_o3.style.color="#ecb21f";
        case 2:
            rating_o2.style.color="#ecb21f";
        case 1:
            rating_o1.style.color="#ecb21f";
    }
}
function setBalance(odgovor){
    balance=odgovor;
    rating_b1.style.color="black";
    rating_b2.style.color="black";
    rating_b3.style.color="black";
    rating_b4.style.color="black";
    rating_b5.style.color="black";
    switch(odgovor){
        case 5:
            rating_b5.style.color="#ecb21f";
        case 4:
            rating_b4.style.color="#ecb21f";
        case 3:
            rating_b3.style.color="#ecb21f";
        case 2:
            rating_b2.style.color="#ecb21f";
        case 1:
            rating_b1.style.color="#ecb21f";
    }
}
function setAtmosfera(odgovor){
    atmosfera=odgovor;
    rating_a1.style.color="black";
    rating_a2.style.color="black";
    rating_a3.style.color="black";
    rating_a4.style.color="black";
    rating_a5.style.color="black";
    switch(odgovor){
        case 5:
            rating_a5.style.color="#ecb21f";
        case 4:
            rating_a4.style.color="#ecb21f";
        case 3:
            rating_a3.style.color="#ecb21f";
        case 2:
            rating_a2.style.color="#ecb21f";
        case 1:
            rating_a1.style.color="#ecb21f";
    }
}

function funkcijaEdit(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
	window.location.href = "editcompany.html?id="+id;
}
