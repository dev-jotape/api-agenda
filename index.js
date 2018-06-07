var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//Configuração e inicialização do firebase
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDkLv5T2ux_oLMuvqssQ-TKKLU-T5EVDTY",
  authDomain: "agenda-de-contatos-8d0e2.firebaseapp.com",
  databaseURL: "https://agenda-de-contatos-8d0e2.firebaseio.com",
  projectId: "agenda-de-contatos-8d0e2",
  storageBucket: "agenda-de-contatos-8d0e2.appspot.com",
  messagingSenderId: "159682396830"
};
firebase.initializeApp(config);
var bd = firebase.database().ref('clientes/');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/clientes', async (req, res) => {
    let clientes = [];

    await bd.on('child_added', (data) => {
        clientes.push({
          "key": data.key,
          "nome": data.val().nome,
          "email": data.val().email,
          "telefone": data.val().telefone,
          "cor": data.val().cor
        });
    });

    if(clientes.length === 0 ) {
        setTimeout (() => {
            res.json(clientes)
        }, 2000)
    } else {
        res.json(clientes)
    }
    
});


app.get('/clientes/:id', (req, res) => {
    const id = req.params.id

    // let cliente;

    firebase.database().ref('/clientes/' + id).once('value').then((snapshot) => {
        res.json(snapshot.val());
    });
    
});
  
  // POST method route
app.post('/clientes', async (req, res) => {
    var req = req.body;

    // pega a referencia da tabela
    let proxId = 0

    // percorre a tabela para ver qual o ultimo ID utilizado
    // o AWAIT irá parar a execução do programa aqui até que esta função termine de ser executada
    await bd.on('child_added', (data) => {
      let ultimoId = parseInt(data.key);
      proxId = ultimoId > proxId ? ultimoId : proxId
    });
    proxId++

    // grava um novo cliente com o proximo ID disponivel
    await firebase.database().ref('clientes/' + proxId).set({
        nome: req.nome,
        email: req.email,
        telefone: req.telefone,
        cor: req.cor
    });

    res.send(201, { id: proxId});
});

app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    var data = req.body;

    firebase.database().ref('clientes/' + id ).update({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cor: data.cor
    });

    res.send(200)
});

app.delete('/clientes/:id', async (req, res) => {
    const id = req.params.id;

    await firebase.database().ref('clientes/' + id).remove()

    res.send(200)
});

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});