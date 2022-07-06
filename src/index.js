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

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

