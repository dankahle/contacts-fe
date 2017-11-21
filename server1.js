const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  cors = require('cors'),
  path = require('path');

const app = express(),
  port = 3000;


var corsOptions = {
  origin: 'http://localhost:3005',
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static('dist'));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  if (req.cookies && !req.cookies.dkContacts) {
    res.cookie('dkContacts', {id: 'xxx', name: 'dank'});
    console.log('setcookie');
  } else {
    console.log('foundcookie', req.cookies.dkContacts.id);
  }
  next();
});


app.use(function(req, res) {
  res.sendStatus(405);
})

app.listen(port, () => console.log(`listening on ${port}`));
