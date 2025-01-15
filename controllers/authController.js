// ADD NEW LIBRARY
const User = require('../models/user')
const Bcrypt = require('bcrypt');
//=============================

exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/index',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};

exports.getLogin = (req, res, next) => {
  res.render('index', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};


exports.getSignup = (req, res, next) => {
  res.render('signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect('/products');
};


//============== UPDATE OUR GROUP CODE 

// signup
exports.postSignup = (req, res, next) => {




};

exports.postLogout = (req, res, next) => {

};

