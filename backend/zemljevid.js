var mymap = L.map('mapid').setView([51.505, -0.09], 13);

console.log("qq");
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiZW1pbGlqYWQiLCJhIjoiY2twcXVzc2VpMDh0YTJ3cWt2eWFvOTN1ZiJ9.jpWb5u4OP_6vd5DdYw-aWg}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap); 
console.log("ww"); 
/*
var tileLayer = L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={pk.eyJ1IjoidGFuamFnMDUiLCJhIjoiY2twcXVlbnc1MDVwZTJxcDFrbHdkZmNiNSJ9.4x14hJef1nBZVUEBvx_RXA}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    subdomains: ['a','b','c','d'],
    mapId: 'mapbox/streets-v11',
    token: 'pk.eyJ1IjoidGFuamFnMDUiLCJhIjoiY2twcXVlbnc1MDVwZTJxcDFrbHdkZmNiNSJ9.4x14hJef1nBZVUEBvx_RXA'
});*/

function dolociLokacijo(){
    let lokacija="Maribor";//document.getElementById("lokacija").nodeValue;
    console.log(lokacija);

    console.log("vv");

    fetch(`http://nominatim.openstreetmap.org/search?format=json&q=${lokacija} `, {method: 'GET'})
    .then((odgovor)=> {return odgovor.json();})
    .then((lokacija)=>{  
        console.log("aa");
        console.log(lokacija);
    });
}

