function naloziPodjetjeZaEdit(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    console.log('[');
    console.log(id);
    console.log(']');
    
    fetch(`http://localhost:3000/eno_podjetje/${id}`, {method: 'GET'})
    .then((odgovor) => {
        console.log('-');
        console.log(odgovor);
        console.log('+');
        return odgovor.json();
    })
    .then((podjetje) => {
        console.log('/');
        console.log(podjetje);
        console.log('//');

        let podjetje_name = document.getElementById("naziv");
        podjetje_name.value = podjetje[0].naziv;

        let podjetje_id = document.getElementById("id");
        podjetje_id.value = podjetje[0].id;

        let podjetje_email = document.getElementById("email");
        podjetje_email.value = podjetje[0].email;

        let podjetje_employers = document.getElementById("velikostPodjetja");
        podjetje_employers.value = podjetje[0].velikostPodjetja;

        let podjetje_spletnaStran = document.getElementById("spletnaStran");
        podjetje_spletnaStran.value = podjetje[0].spletnaStran;

        let podjetje_socialLinks = document.getElementById("socialnePovezave");
        podjetje_socialLinks.value = podjetje[0].socialnePovezave;

        let telephone = document.getElementById("telefon");
        telephone.value = podjetje[0].telefon;

        let lokacija = document.getElementById("lokacija");
        lokacija.value = podjetje[0].lokacija;

        let branza=document.getElementById("branza_id");
        branza.selectedIndex=podjetje[0].branza_id;
     
        console.log(branza.value);

       let podjetje_opis = document.getElementById("opis");
        podjetje_opis.value = podjetje[0].opis; 

        let podjetje_logo=document.getElementById("logotip");
        podjetje_logo.value=podjetje[0].logotip; 
    });
}
