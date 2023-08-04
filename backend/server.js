var express = require('express');
const bodyParser = require('body-parser');
var app = express();

const bcrypt = require('bcryptjs');
const dateFormat = require ('dateformat');
const fileUpload = require('express-fileupload');
var mysql = require ('mysql');
var http = require('http');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
const cors= require ('cors');
const { response } = require('express');
app.use(cors());
app.use(fileUpload());


var knex = require ('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '7668',
        database: 'horribleboss'
    }
});

//app.use(express.static(path.join(__dirname, '/../public')));

const bookshelf = require ('bookshelf')(knex);


var Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabnik',
    idAttribute: 'id'
})

var Ocena = bookshelf.Model.extend({
    tableName: 'ocena',
    idAttribute: 'id'
})

var Branza = bookshelf.Model.extend({
    tableName: 'branza',
    idAttribute: 'id'

})

var Podjetje = bookshelf.Model.extend({
    tableName: 'podjetje',
    idAttribute: 'id'

})

var Lastnistvo = bookshelf.Model.extend({
    tableName: 'lastnistvo',
    idAttribute: 'id'

})

var Komentar = bookshelf.Model.extend({
    tableName: 'komentar',
    idAttribute: 'id'
})

var Ocenjevanje = bookshelf.Model.extend({
    tableName: 'ocenjevanje',
    idAttribute: 'id'
})

app.get('/public/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
 });
 
 app.get('/', function (req, res) {
     res.send('Moja prva spletna aplikacija');
 });


 //lastnistvo
 app.post('/lastnistvo', async (req, res, next) => {
    try {
        let slika=Buffer.from(req.files.file.data);
        let nov = {
            odobritev: req.body.odobritev,
            uporabnik_id: req.body.uporabnik_id,
            podjetje_id: req.body.podjetje_id,
            slika: slika
		};
		console.log("3");
		let lastnistvo = await new Lastnistvo().save(nov);
		console.log("4");
        
        //res.status(204).send();
        //res.json(lastnistvo.toJSON());
        //res.send('<script>window.alert("Added successfully")');
        //res.send("Request sent!");
        //res.json(lastnistvo.toJSON());
		console.log("5");
    } catch (error) {
		console.log(error);
    }
});

app.get('/lastnistvo/:id', async(req, res, next)=>{
    try{
		console.log("1");
		let id = req.params.id;
		console.log(id);
        let uporabnik = await new Uporabnik().where('id', id).fetch();
		console.log(uporabnik);
		//console.log(uporabnik.toJSON());
		if(!uporabnik.toJSON().admin || (uporabnik.toJSON() == ''))
			res.status(500).json("Not admin");
		else{
			let query = Lastnistvo;		
			query.fetchAll()
			.then(function (skus) {
				if (skus){
					let s = skus.toJSON();
					
					s.forEach(function(a) {
						a.slika = Buffer.from(a.slika, 'base64').toString('base64');
					});
					console.log("iaa");
					console.log("ibb");
					res.json(s);
				}else
					res.status(500).json('eror');
			}).catch(function (err) {
				console.log(err);
				res.status(500).json(err);
			});
			//res.json(lastnistvo.toJSON());
		}
    }catch(error){
		console.log(error);
        res.status(500).json(error);
    }
});

app.delete('/izbrisiLastnishtvo/:id', async (req, res, next) => {
	await new Lastnistvo({id: req.params.id}).destroy();
    console.log("2");
	res.json('');
});

app.post('/odobritiLastnistvo', async (req, res, next) => {
    console.log(req.body);
	await knex('lastnistvo').where('id', req.body.lastnost_id).update({odobritev: true}). 
		then(() => res.status(204).send()) //todo reload
        .catch((err) => { console.log(err); throw err });
});


//----uporabnik

app.get('/uporabnik', async (req, res, next) => {
    try{
        let uporabnik = await new Uporabnik().fetchAll();
        res.json(uporabnik.toJSON());

    } catch (error){
        res.status(500).json(error);
         
    }
});   
app.post('/register', async (req, res, next) => {

    try {
console.log("ide");
        let pas = req.body.password;
        let email = req.body.email;
        let conf = req.body.confirmedPassword;
            
        const uporabnik = await new Uporabnik().fetchAll();
        const accounts= uporabnik.toJSON();

        let checkUser = accounts.find(element => element.email === email);

        if(checkUser == null ) {
         if ( (pas == conf) ) {
                console.log("tuka");
                let nov = {
                    ime: req.body.ime,
                    priimek: req.body.priimek,
                    email: req.body.email,
                    password: req.body.password,
                    admin: req.body.admin
                };
             console.log(nov);

                nov.password = bcrypt.hashSync(nov.password, 12);
                console.log(nov.password);

                let uporabnik = await new Uporabnik().save(nov);
                console.log("ok");
                return res.json({ status: 'Confirmed', uporabnik: uporabnik.toJSON() });

            } else if (req.body.password !== req.body.confirmedPassword ) { 
                
                return res.json({ status: 'Passwords do not match.' }); }


        } else {
            
          return res.json({ status: "Email already taken." });

       }
        
    } catch (error) {
        console.log(error);

        return res.json({ status: "Server error" });
    }
});




app.post('/login', async (req, res, next) => {

    try {


        let exciting = {


            email: req.body.email,
            password: req.body.password
        };

        let uporabnik = await new Uporabnik().where('email', exciting.email).fetch();

        correctPassword = bcrypt.compareSync(exciting.password, uporabnik.toJSON().password);

        if (correctPassword) {
            return res.json({ status: 'OK', uporabnik: uporabnik.toJSON() });

        } else
            return res.json({ status: 'Wrong password' });
    } catch (error) {
        res.json({ status: 'There is no user with that email' });
    }
});


app.get('/editUser/:id', async (req, res, next) => {
    try {
        
        const id = req.params.id;

        let uporabnik = await new Uporabnik().where('id', id).fetchAll();
        
        res.json(uporabnik.toJSON());

    } catch (error) {
        res.status(500).json(error);
    }
});
app.post('/editUser', async (req, res) => {

    const id = req.body.id;

    await knex('uporabnik').where('id', id).update({ ime: req.body.ime, priimek: req.body.priimek, email: req.body.email, username: req.body.username }).
        then(() => console.log("Uporbanik spremenjen"))
        .catch((err) => { console.log(err); throw err });

    res.json({status: 'Changed succesfully'})
})


app.post('/editPassword', async (req, res) => {
   console.log("ok");
    const id = req.body.id;
    
    console.log(id);
    let uporabnik = await new Uporabnik().where('id', id).fetch();

    console.log("44");
    correctPassword = bcrypt.compareSync(req.body.password, uporabnik.toJSON().password);
    console.log("33");
    let pas = req.body.newPassword;
    let conf = req.body.confirmedNew;
    console.log("1");
    console.log(req.body.newPassword);
    console.log("2");
    if (correctPassword) {
        if(pas==conf){
            console.log("3");
            
            await knex('uporabnik').where('id', id).update({ password: bcrypt.hashSync(req.body.newPassword,12) }, ['id', 'password']).
        then(() => console.log("Password changed"))
        .catch((err) => { console.log(err); throw err });

         return res.json({status: 'Password changed succesfully'})
        

        } else {
            return res.json({status : 'Passwords do not match'})
        }



    } else
        return res.json({ status: 'Wrong old password' });

});
app.get('/en_uporabnik/:id', async (req, res, next) => {
    try{
		console.log('u');
		let id = req.params.id;
		
		await knex('uporabnik')
		.select({
			ime: 'uporabnik.ime',
			priimek: 'uporabnik.priimek'
		})
		.where('id', id)
		.then((skus) => {console.log(skus);res.json(skus);})
        .catch((err) => { console.log(err); throw err });
		
	
    } catch (error){
        res.status(500).json(error);
    }
});

// podjetje: dodajanje in urejanje
app.post('/edit', async (req, res) => {
    const id = req.body.id;
	let podjetjeNOVO = {
		naziv: req.body.naziv, 
		email: req.body.email, 
		opis: req.body.opis, 
		lokacija: req.body.lokacija, 
		velikostPodjetja: req.body.velikostPodjetja, 
		spletnaStran: req.body.spletnaStran, 
		telefon: req.body.telefon, 
		socialnePovezave: req.body.socialnePovezave 
	};
	if(req.files != null)
		podjetjeNOVO.logotip = req.files.logotip.data;
    await knex('podjetje').where('id', id).update(podjetjeNOVO).
        then(() => console.log("Podjetje spremenato"))
        .catch((err) => { console.log(err); throw err });
    console.log("wawawa");
	//res.json('Success'.toJSON());
});


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
app.post('/podjetje', async(req, res, next) => {
    console.log(req.body);
    try{          
        let toni=Buffer.from(req.files.logotip.data);
        let novo = {
            opis: req.body.opis,
            naziv: req.body.naziv, 
            lokacija: req.body.lokacija, 
            branza_id: b.indexOf(req.body.branza_id),
            velikostPodjetja: req.body.velikostPodjetja,
            email: req.body.email,
            spletnaStran: req.body.spletnaStran,
            logotip: toni,
            telefon: req.body.telefon,
            socialnePovezave: req.body.socialnePovezave};
        let podjetje = await new Podjetje().save(novo);
        //return res.status(200).send();
    } catch(error){
        console.log(error.toString());
        return res.json({status : 'Please enter valid information'})
    }
});
app.get('/kalk_ocena/:id', async (req, res, next) => {
    try{
		let id = req.params.id;
		console.log(req.params.id);
		
		await knex('komentar')
		.avg('ocena')
		.where('podjetje_id', id)
		.then((skus) => {
            console.log(skus);
            res.json(skus[0]);
        })
        .catch((err) => { console.log(err); throw err });
		
	
    } catch (error){
        res.status(500).json(error);
    }
});

app.get('/isOwner/:id', async (req, res, next) => {
    try{
		console.log('m');
		let ids = req.params.id;
		
		
		console.log('uporabnik_id' + ids.substring(0, ids.lastIndexOf('|')));
		console.log('podjetje_id' + ids.substring(ids.lastIndexOf('|')+1));
		
		await knex('lastnistvo')
		.select({
			odobritev: 'odobritev',
		})
		.where('uporabnik_id', ids.substring(0, ids.lastIndexOf('|')))
		.andWhere('podjetje_id', ids.substring(ids.lastIndexOf('|')+1))
		.then((skus) => {console.log("skus");console.log(skus);res.json(skus);})
        .catch((err) => { console.log(err); res.json('0'); });
		
	
    } catch (error){
        res.status(500).json(error);
    }
});

app.get('/l_podjetje/:id', async (req, res, next) => {
    try{
		console.log('m');
		let id = req.params.id;
		
		await knex('podjetje')
		.select({
			naziv: 'naziv',
		})
		.where('id', id)
		.then((skus) => {console.log(skus);res.json(skus);})
        .catch((err) => { console.log(err); throw err });
		
	
    } catch (error){
        res.status(500).json(error);
    }
});

app.get('/eno_podjetje/:id', async(req, res, next) => {
    try{
        console.log('hi im here');
        const id = req.params.id;
        console.log('podjetje e 1');
        let podjetje = await new Podjetje().where('id', id).fetchAll();
        console.log('podjetje e 2');
        res.json(podjetje.toJSON());
        console.log('podjetje e okej');
    } catch(error){
        res.status(500).json(error);
    }
}); 


app.get('/en_podjetje/:id', async(req, res, next) => {
    try{      
        
        const id = req.params.id;       
          let podjetje = await new Podjetje().where('id', id).fetch();
          console.log(podjetje);
          let kakobilo = podjetje.toJSON();
          kakobilo.logotip = Buffer.from(kakobilo.logotip, 'base64').toString('base64');
          res.json(kakobilo);
          console.log('podjetje e okej');
           //res.send('<script>window.alert("Added successfully");window.location="/index.html";</script>');
       } catch(error){
          // res.send('<script>window.alert("Added successfully");window.location="/index.html";</script>');
          res.status(500).json(error);
       }
   }); 
   

app.get('/branza', async(req, res, next)=>{
    try{
        const id=req.query.id;
        console.log(id);
        Branza.where('id', id).fetch().then(function (skus) {
            if (skus) console.log(skus.toJSON());
            res.json(skus.toJSON());
        }).catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        });
    }catch(error){
        console.log(error);
        res.status(500).json(error);       
    }
}); 
// brisanje komentari


app.post('/dodajOdgovor', async (req, res) => {

    await knex('komentar').where('id', req.body.id).update({ odgovor: req.body.odgovor})
        .then(() => console.log("Odgovro dodaden"))
        .catch((err) => { console.log(err); throw err });
    res.json({status: 'Changed succesfully'})
})

app.post('/komentar', async(req, res, next) => {
    console.log(req.body);
     try{
         var created_at = dateFormat(new Date(), 'yyyy-mm-dd ');
        //let date_ob = new Date().toLocaleString();
         let kom = {
             uporabnik_id: req.body.uporabnik_id,//req.body.uporabnik_id, 
             podjetje_id: req.body.podjetje_id,//req.body.podjetje_id, 
             datum:  created_at,
             vsebina: req.body.vsebina,
             ocena: req.body.ocena
          }; 
          let komentar = await new Komentar().save(kom);        
        res.json(komentar.toJSON());
         //res.send('<script>window.alert("Added successfully")');
     } catch(error){
         res.status(500).json(error);
     }
 });

 app.get('/komentar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        Komentar.where('podjetje_id', id).fetchAll().then(
            function (komentari){
                res.json(komentari.toJSON());
            }
        )
    } catch (error) {
        res.status(500).json(error);
    }
}); 


app.delete("/izbrisiKomentar/:id", async (req, res, next) => {
    try{
        console.log(req.params.id);
    await new Komentar({id: req.params.id}).destroy();
   console.log("2");
        res.send('');
    
}catch(err){
    console.log(err);
}
});
   
app.get('/search/:parametri', async(req, res, next) => {
	
	console.log("a");
	
	let parametri = req.params.parametri;
	let parametriJson = JSON.parse(parametri);
	
	console.log("b");
	
	console.log(parametriJson);
	
	let naziv = parametriJson.naziv;
	let branza = b.indexOf(parametriJson.branza);
	
	console.log(branza);
	
	let lokacija = parametriJson.lokacija;
	
	let query = Podjetje;
	
	if(naziv != undefined){
		query=query.where('naziv',  'like', '%'+naziv+'%')
	}
	if(branza != undefined && branza != -1){

		query=query.where('branza_id',  branza)
	}
	if(lokacija != undefined){
		query=query.where('lokacija',  lokacija)
	}
		
	query.fetchAll()
	.then(function (skus) {
		if (skus){
	
			let kakobilo = skus.toJSON();
			console.log(kakobilo[0]);
         // kakobilo.logotip 
			for (let i = 0; i < kakobilo.length; i++) {
				kakobilo[i].logotip = Buffer.from(kakobilo[i].logotip, 'base64').toString('base64');	
			}
			res.json(kakobilo);
		}
		else{
			console.log('linija 358');
			res.status(500).json('eror');
		}
	}).catch(function (err) {
		console.log(err);
        res.status(500).json(err);
	});
});



app.listen(3000);


