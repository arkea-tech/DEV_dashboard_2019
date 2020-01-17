const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('../config/database');
const mongoose = require('mongoose');

mongoose.connect(config.database, {useNewUrlParser:true, useUnifiedTopology:true});
let db = mongoose.connection;

let User = require('../models/user');

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const	username = req.body.username;
  const	password = req.body.password;
  const	password2 = req.body.password2;
  const cinema = false;
  const pokemon = false;
  const google = false;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  }else {
      let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password,
        cinema:cinema,
        pokemon:pokemon,
        google:google
      });

      bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(newUser.password, salt, function(err, hash) {
              if(err){
                console.log(err);
              }
              newUser.password = hash;
              newUser.save(function(err){
                if(err){
                  console.log(err);
                  return;
                } else {
                  req.flash('success', 'You are now registered and can log in');
                  res.redirect('/users/login');
                }
              });
          });
      });
  }
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res, next ){
  passport.authenticate('local', {
    successRedirect:'/users/subscriptions',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'you are logged out');
  res.redirect('/users/login');
});

router.get('/subscriptions', function(req, res){
  res.render('subscriptions');
});

router.post('/subscriptions', function(req, res, next) {
  const id = req.user._id;
  var cinema = true;
  var pokemon = true;
  var google = true;

  if (req.body.cinema == "true") {cinema = true;} else {cinema = false}
  if (req.body.pokemon == "true") {pokemon = true;} else {pokemon = false}
  if (req.body.google == "true") {google = true;} else {google = false}
  db.collection('users').updateOne({"_id": id},
                                  {$set: {"cinema": cinema}}
                                );
  db.collection('users').updateOne({"_id": id},
                                  {$set: {"pokemon": pokemon}}
                                );
  db.collection('users').updateOne({"_id": id},
                                  {$set: {"google": google}}
                                );
  res.redirect('/');
});

module.exports = router;
