const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const env = require('./config/environment');

const session = require('express-session');
const port = env.port;

const db = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const MongoStore = require('connect-mongo');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
