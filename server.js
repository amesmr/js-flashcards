const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const app = express();


const MONGODB_URI = process.env.MONGODB_URI || "mongod://localhost/checkPoint";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);






