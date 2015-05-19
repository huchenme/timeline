var express = require('express');
var app = express();
var isMobile = require('cloud/utils/mobile-detection');

app.set('views','cloud/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());

app.get('/', function(req, res) {
  if (isMobile(req)) {
    res.render('mobile');
  } else {
    res.render('index');
  }
});

app.listen();

app.use(function(req, res, next){
  res.status(404).render('404');
});
