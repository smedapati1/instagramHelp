var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var cookieParser  = require('cookie-parser');
var instagramApi  = require('instagram-node').instagram();
var config        = require('./config');
var Bluebird      = require('bluebird');

Bluebird.promisifyAll(instagramApi);

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
  res.redirect('/authorize-user');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



router.get('/authorize-user', function (req, res) {
  instagramApi.use({
    client_id: config.instagram_client_id,
    client_secret: config.instagram_client_secret
  });
  res.redirect(instagramApi.get_authorization_url(config.instagram_redirect_uri));
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


  router .get("/api2",function(req, res){

  console.log(req.user);
  //  req.user.accessToken = '599978680.1d6835e.f4511416a26849d5a02fd840114dc236';
    var options = {access_token: '599978680.1d6835e.f4511416a26849d5a02fd840114dc236'};
    instagramApi.use(options);
    instagramApi.user('599978680', function(err, result, remaining, limit) {
      console.log(result.username);
      if(result) console.log('Yatta');
      res.render('dd',{data:result});
    });



     });



module.exports = router;