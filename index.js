var express = require('express');
var app = express();

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
var bd = firebase.database().ref('clientes/')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    let clientes;

    bd.on('child_added', (data) => {
        clientes.push({
          "key": data.key,
          "nome": data.val().nome,
          "email": data.val().email,
          "telefone": data.val().telefone,
          "cor": data.val().cor
        });
    });
    
    res.json(clientes)
});

// GET method route
app.get('/clientes', function (req, res) {
    res.send('GET request to the homepage');
});

app.get('/clientes/:id', function (req, res) {
    const id = req.params.id

    
    res.send('GET request to the homepage');
});
  
  // POST method route
app.post('/clientes', function (req, res) {
    var data = req.body;

    res.send('POST request to the homepage');
});

app.put('/clientes/:id', function (req, res) {
    const id = req.params.id

    res.send('POST request to the homepage');
});