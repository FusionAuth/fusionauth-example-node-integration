/*this file handles user login, logout, and prevents access to /profile
if user is not logged in*/
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.json());
const {FusionAuthClient} = require('fusionauth-node-client');
const client = new FusionAuthClient(
  'bf69486b-4733-4470-a592-f1bfce7af580',
  'http://localhost:9011'
);


const applicationId = '531a8dfb-b8da-4064-8e76-834609911496';
const data = {
  user: null,
  token: null
};

app.use(session({
  secret: 'fusionauth',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.get('/logout', function(req, res){
  req.session.destroy()
  res.send("Successfully Logged Out");
});

app.get('/login', function(req, res) {
    if (req.session.user) {
        console.log('user: ', req.session.user);
        res.send("We already have a user");
    } else {
        const obj = {
            'loginId': req.query.user,
            'password': req.query.password,
            'applicationId': applicationId
        };
        client.login(obj)
            .then(function(clientResponse) {
                req.session.user = clientResponse.successResponse.user;
                req.session.token = clientResponse.successResponse.token;
                console.log(JSON.stringify(clientResponse.successResponse, null, 8))
                res.redirect('/profile');
            })
            .catch(function(error) {
                console.log("ERROR: ", JSON.stringify(error, null, 8))
                res.send("Login failure");
            });

    }
});

app.get('/profile', function(req, res){
  if (!req.session.user) {
    res.send("Login Required");
  } else {
    res.send("Profile");
  }
});

app.post('/register', function(req, res){
    client.register(null, req.body)
        .then(function(clientResponse) {
            res.send(clientResponse);
        })
        .catch(function(error) {
            console.log("ERROR: ", JSON.stringify(error, null, 8))
            res.send(error);
        });
});

app.listen(3000, function(){
  console.log('FusionAuth example app listening on port 3000');
});
