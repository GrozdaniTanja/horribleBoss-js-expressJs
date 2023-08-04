function naloziUporabnik(){
    const prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    console.log(prijavljen);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

   if(prijavljen == null) {
    document.getElementById("prijavljen1").style = "display:none;";
    document.getElementById("admin").style = "display:none;";
    document.getElementById("new").style = "display:none;";
    document.getElementById("newc").style = "display:none;";
    document.getElementById("tekst").style="display:none;";
   }
   
   else{
    document.getElementById("ime_uporabnika").innerHTML = "<b>" + prijavljen.ime + "</b>!";
    document.getElementById("ni_prijavljen").style = "display:none";
 
    if(prijavljen.admin == null )
    
       document.getElementById("admin").style = "display:none;";
    

   }
    fetch(`http://localhost:3000/editUser/${id}`, {method: 'GET'})
    .then((odgovor) => { return odgovor.json()})
    .then((uporabnik) => {
        let avatar = document.getElementById("avatar");
		avatar.src= "https://eu.ui-avatars.com/api/?background=fff&color=ecb21f&name="+prijavljen.ime+"+"+prijavljen.priimek;
		
        let user_id = document.getElementById("id");
        user_id.value = prijavljen.id;

        let FirstName = document.getElementById("ime");
        FirstName.value = prijavljen.ime;
        
        let LastName = document.getElementById("priimek");
        LastName.value = prijavljen.priimek;
 
          
        let user_email = document.getElementById("email");
        user_email.value = prijavljen.email;
       
    });
}

function redirektiraj(){
    event.preventDefault();
    
    var form_data = new FormData(document.getElementById("settingsForm"));
    const data = new URLSearchParams(form_data);
    
    fetch('http:/localhost:3000/editUser', {method:'POST', body:data})
    .then((odgovor) => {return odgovor.json()})
    .then((odgovor) => {

        window.alert(odgovor.status);
        window.location.href = "index.html";
        
    });
}


function redirektirajPassword(){
    event.preventDefault();
    const prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    let user_id = document.getElementById("id");
        user_id.value = prijavljen.id;
    
    var form_data = new FormData(document.getElementById("passwordForm"));
    const data = new URLSearchParams(form_data);
    
    fetch('http://localhost:3000/editPassword', {method:'POST', body:data})
    .then((odgovor) => {return odgovor.json()})
    .then((odgovor) => {
        if (odgovor.status != 'Password changed succesfully'){
            window.alert(odgovor.status);
        document.getElementById('newPassword').value='';
        document.getElementById('password').value='';
        document.getElementById('confirmedNew').value='';
        }
       
        else {
            window.alert(odgovor.status);
            window.location.href = "index.html";
        }

        
        
    });
}

function odjavi() {
    sessionStorage.clear();
    console.log("odljaven");

    window.location.href = "login.html";
}

function nalozi(){
    const prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    console.log(prijavljen);
      
   if(prijavljen == null) {
        document.getElementById("prijavljen1").style = "display:none;";
        document.getElementById("admin").style = "display:none;";
        document.getElementById("new").style = "display:none;";
    }
    else{
        document.getElementById("ni_prijavljen").style = "display:none;";
        console.log("i mean it");
        console.log(prijavljen);
        if(prijavljen.admin == null )
            document.getElementById("admin").style = "display:none;";
    }
}
//--------------------------------------------------------------



// vo formata vo newcompany.html stavas id="formEditCompany" i onsubmit="redirektirajNewCompany()"
function redirektirajNewCompany(){
    event.preventDefault();
    var form_data = new FormData(document.getElementById("formNewCompany"));
    const data = new URLSearchParams(form_data);
    fetch('http://localhost:3000/podjetje', {
		method:'POST', 
		body:data
		
	})
    .then((odgovor) => {return odgovor.json()})
    .then((odgovor) => {
        window.alert(odgovor.status);
        window.location.href = "search.html";
    });
}
 
// vo formata vo editcompany.html stavas id="formEditCompany" i onsubmit="redirektirajEditCompany()"
function redirektirajEditCompany(){
    event.preventDefault();
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var form_data = new FormData(document.getElementById("formEditCompany"));
    const data = new URLSearchParams(form_data);
    
    fetch('http://localhost:3000/podjetje', {method:'POST', body:data})
    .then((odgovor) => {return odgovor.json()})
    .then((odgovor) => {
        console.log("tuka");
 
        window.alert(odgovor.status);
        window.location.href = "company.html?id="+id;
        
    });
}
