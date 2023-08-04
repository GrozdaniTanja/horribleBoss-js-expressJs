function register(){
    console.log("ok");
    event.preventDefault();
    
    var form_data = new FormData(document.getElementById("registerForm"));
    const data = new URLSearchParams(form_data);
    console.log(data);
    fetch('http://localhost:3000/register', {method:'POST', body:data})
    .then((odgovor) => {
        console.log(odgovor.json);
        return odgovor.json();
        
    })
    .then((odgovor) => {
    if(odgovor.status !== 'Confirmed'){
        informacije1 = document.getElementById("informacije1");
        informacije1.innerHTML= odgovor.status;
        informacije1.style= "display : block;";
        
        
        document.getElementById('email').value='';
        document.getElementById('password').value='';
        document.getElementById('confirmedPassword').value='';
        
        

    } else
    {
        
        window.location.href = "index.html";
    }

    });
    };