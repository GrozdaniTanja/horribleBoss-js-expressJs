function openSearch(){
	console.log("1");
	let url = 'search.html?';
	
	console.log("2");
	let naziv = document.getElementById("naziv").value;
	let branza = document.getElementById("branza").value;
	let lokacija = document.getElementById("lokacija").value;
	
	console.log("3");
	let f = false;
	
	console.log("4");
	url=url+'{';
	if(naziv != ''){
		if(!f)
			f = true;
		else
			url=url+',';
		url=url+'"naziv":"'+naziv+'"';
	}
	if(branza != ''){
		if(!f)
			f = true;
		else
			url=url+',';
		url=url+'"branza":"'+branza+'"';
	}
	if(lokacija != ''){
		if(!f)
			f = true;
		else
			url=url+',';
		url=url+'"lokacija":"'+lokacija+'"';
	}
	url=url+'}';
	console.log("5");
	window.location.href = url;
}
