var knex = require ('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '7668',
        database: 'horribleboss'

    }
});

async function napolniBazo() {
    knex.schema.dropTableIfExists('lastnistvo').catch((err)=>{console.log(err);throw err});
    knex.schema.dropTableIfExists('komentar').catch((err)=>{console.log(err);throw err});
    knex.schema.dropTableIfExists('branza').catch((err)=>{console.log(err);throw err});
    knex.schema.dropTableIfExists('uporabnik').catch((err)=>{console.log(err);throw err});
    knex.schema.dropTableIfExists('podjetje').catch((err)=>{console.log(err);throw err});
    await knex.schema.createTable('uporabnik',(table)=>{
        table.increments('id').unsigned();
        table.string('ime').notNullable();
        table.string('priimek').notNullable();
        table.string('email');
        table.string('password').notNullable();
        table.boolean('admin');
    }).then(()=> console.log("Tabela narejena"))
    .catch((err)=>{console.log(err);throw err});

    await knex.schema.createTable('branza',(table)=>{
        table.increments('id').unsigned();
        table.string('naziv').notNullable();
    }).then(()=> console.log("Tabela narejena"))
    .catch((err)=>{console.log(err);throw err});

    await knex.schema.createTable('podjetje',(table)=>{
        table.increments('id').unsigned();
        table.string('naziv').notNullable();
        table.string('opis', 1300);
        table.string('lokacija').notNullable();
        table.integer('branza_id').references('id').inTable('branza').unsigned();
        table.string('velikostPodjetja').notNullable();
        table.string('email');
        table.string('spletnaStran');
        table.binary('logotip');
        table.string('telefon');
        table.string('socialnePovezave');   
    }).then(()=> console.log("Tabela narejena"))
    .catch((err)=>{console.log(err);throw err});

    await knex.schema.createTable('komentar',(table)=>{
        table.increments('id').unsigned();
        table.integer('uporabnik_id').references('id').inTable('uporabnik').notNullable().unsigned();
        table.integer('podjetje_id').references('id').inTable('podjetje').notNullable().unsigned();
        table.string('datum').notNullable();
        table.integer('ocena').notNullable();
        table.string('vsebina').notNullable();
        table.string('odgovor');
    }).then(()=> console.log("Tabela narejena"))
    .catch((err)=>{console.log(err);throw err});

    await knex.schema.createTable('lastnistvo',(table)=>{
        table.increments('id').unsigned();
        table.integer('uporabnik_id').references('id').inTable('uporabnik').notNullable().unsigned();
        table.integer('podjetje_id').references('id').inTable('podjetje').notNullable().unsigned();
        table.binary('slika').notNullable();
        table.boolean('odobritev').notNullable();

    }).then(()=> console.log("Tabela narejena"))
    .catch((err)=>{console.log(err);throw err});

    const branzi = [
        {naziv: 'Choose...'},
        {naziv : 'Science & Technology'},
        {naziv : 'Fashion & Design'},
        {naziv : 'Food & Beverage'},
        {naziv : 'Transport & Utilities'},
        {naziv : 'Law services'},
        {naziv : 'Furniture & Housing'},
        {naziv : 'Arts, culture and entertainment'},
        {naziv : 'Education'},
        {naziv : 'Installation and maintenance'},
        {naziv : 'Business and administration'},

 
    ]
   await knex('branza').insert(branzi).
   then(() => console.log ("Branzi vstavjeni"))
   .catch((err)=>{console.log(err);throw err});

   knex.destroy(); 

}
napolniBazo();
