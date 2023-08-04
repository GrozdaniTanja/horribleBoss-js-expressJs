function login(){
    event.preventDefault();
    
    var form_data = new FormData(document.getElementById("loginForm"));
    const data = new URLSearchParams(form_data);
    
    fetch('http://localhost:3000/login', {method:'POST', body:data})
    .then((odgovor) => {return odgovor.json()})
    .then((odgovor) => {
    if(odgovor.status !== 'OK'){
        
        informacije = document.getElementById("informacije");
        informacije.innerHTML= odgovor.status;
        informacije.style= "display : block;";
    } else
    {
        sessionStorage.setItem('prijavljen', JSON.stringify(odgovor.uporabnik));
        window.location.href = "index.html";
    }
    });
    };