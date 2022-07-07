const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');

const app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://komalbansod_04:BdcyrSiZZa4v5y76@komal04.fvnel.mongodb.net/gleecusDatabase?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);


app.set('view engine', 'ejs');
var access_token = "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";

app.get('/', function(req, res) {
  res.render('pages/index',{client_id: clientID});
});

const axios = require('axios')

const clientID = 'e4fc4c549d7eff22f23b'
const clientSecret = '6a94eb52b8fbdfc04a071a784bb709c5ed7b6b56'


app.get('/github/callback', (req, res) => {

  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
  
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `http://localhost:3000/allpost`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.send({ userData: response.data });
  })
});


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});







