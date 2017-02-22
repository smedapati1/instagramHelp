var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var cookieParser  = require('cookie-parser');
var instagramApi  = require('instagram-node').instagram();
var config        = require('./config');
var Bluebird      = require('bluebird');
var Client = require('instagram-private-api').V1;
var tough = require('tough-cookie');
var path = require('path');
var mkdirp = require('mkdirp');

var _ = require('underscore');
var fs = require('fs');
Bluebird.promisifyAll(instagramApi);
mkdirp.sync(__dirname + '/cookies');
mkdirp.sync(__dirname + '/tmp');
router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});
router.get('/dashboard',  function(req, res) {
  res.render('dashboard', { });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/authorize-user');
    });
  });
});


router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/instagramlogin');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/instagramlogin', function(req, res) {
  res.render('instaLogin');
});

function ccc(){
  console.log('yatta');
}

router.post('/authorize-user', function (req, res) {

 // var Cookie = tough.Cookie;
  var cookie = new tough.Cookie({
    domain : 'google.com',
    path: '/',
    key :'',
    value: 'value01'
  });
  var cookiejar = new tough.CookieJar();
 //cookiejar.setCookie(cookie, 'http://localhost:3000/',ccc());

  var device = new Client.Device(req.body.username);
/* var filename = "http://instagramhelper.herokuapp.com/images/" + req.body.username +".json";
  console.log(filename);
  fs.writeFile(filename, "", [encoding], [callback])*/
  var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+req.body.username+'.json');

 // var storage = new Client.CookieStorage(cookiejar);
  console.log('hai re hai');
  console.log(req.body);
  var promise = Client.Session.create(device, storage, req.body.username, req.body.password);
  promise.then(function(sessionInstance) {
    session = sessionInstance;
    module.exports.session = session;
    session.getAccount()
        .then(function(account) {
          console.log(account.params)
          res.render('dd',{data:req.body});
        })
  });

});

router.get('/handleauth', function (req, res) {
  instagramApi.authorize_user(req.query.code, config.instagram_redirect_uri)
      .then(function (result) {
        res.cookie('instaToken',result.access_token, { maxAge: 900000, httpOnly: true });
        res.redirect('/api2');
      })
      .catch(function (errors) {
        console.log(errors);
      });
});


  router .get("/myaccount",function(req, res){
    session.getAccount()
        .then(function(account) {
          console.log(account.params)});
    console.log('jjjjjj'+req.body);
      res.render('dd',{data:req.body});




     });



module.exports = router;