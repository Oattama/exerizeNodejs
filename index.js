const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const getMission = require('./controller/mission');
const register = require('./controller/register');
const login = require('./controller/login');
const auth = require('./controller/auth');
const getRefresh_token = require('./controller/strava');
const getProfile = require('./controller/getProfile');
const history = require('./controller/history');
const ranking = require('./controller/getRanking');
const getItem = require('./controller/getItem');
const addItem = require('./controller/updateItem');
const change = require('./controller/changeItem');

const app = express();

app.use(cors());

//-----------------------------------------Login/Register-----------------------------------------//
//Register
app.post('/register', jsonParser, (req, res) => {
    register(req,res);
})

//Login
app.post('/login', jsonParser, (req, res) => {
    login(req,res);
})

//authen
app.post('/auth', jsonParser, (req, res) => {
    auth(req,res);
})
//-----------------------------------------Login/Register-----------------------------------------//

//profile
app.post('/profile',jsonParser, (req, res) => {
    getProfile(req,res);
})

//-----------------------------------------mission-----------------------------------------//

//mission
app.post('/mission',jsonParser, (req, res) =>{
    getMission(req,res);
})

//-----------------------------------------mission-----------------------------------------//

//history
app.post('/history',jsonParser, (req,res) => {
    history(req,res);
})

//item
app.post('/item',jsonParser, (req,res) => {
    getItem(req,res);
})

//addItem
app.post('/additem',jsonParser, (req,res) => {
    addItem(req,res);
})

//changeItem
app.post('/changeitem',jsonParser, (req,res) => {
    change(req,res)
})

//ranking
app.get('/ranking',(req,res) => {
    ranking(req,res);
})

//-----------------------------------------strava-----------------------------------------//

//insert refresh_token
app.post('/strava',jsonParser, (req, res) => {
    getRefresh_token(req,res)
})

//-----------------------------------------strava-----------------------------------------//


app.listen(5000, () => {
    console.log('Server started successfully');
})