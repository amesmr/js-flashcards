const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan')

const PORT = process.env.PORT || 8080;
const app = express();


const MONGODB_URI = process.env.MONGODB_URI || "mongod://localhost/checkPoint";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build/'))
} else {
    app.use(express.static('./client/public/'))
}


app.listen(PORT, function() {
    console.log('Server listening on: http://localhost:' + PORT)
})






