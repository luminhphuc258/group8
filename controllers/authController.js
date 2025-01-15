
// ADD NEW LIBRARY
const User = require('../models/user');
const Product = require('../models/products');
const Bcrypt = require('bcrypt');
const Product = require('../models/products');
//=============================

exports.getIndex = (req, res, next) => {
  res.render('index', {
    csrfToken: req.csrfToken(),
    path: '/index',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};

exports.getLogin = (req, res, next) => {
  res.render('index', {
    csrfToken: req.csrfToken(),
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};


exports.getSignup = (req, res, next) => {
  res.render('signup', {
    csrfToken: req.csrfToken(),
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.isLoggedIn
  });
};

exports.postLogin = async (req, res, next) => {
  // req.isLoggedIn = true;
  // res.redirect('/products');

  // ======= UPDATE CODE 
  const useremail = req.body.email;
  const password = req.body.password;
 
  const user = await User.findOne({ where: { email: useremail.toLowerCase() } });

  if (user) {
    // Compare provided password with stored hashed password
    const isValid = await Bcrypt.compare(password, user.password);
    if (isValid) {
      // when login successfully
      console.log("Login successfully!" + useremail);
      req.session.isLoggedIn = true;

      // let redirt to main page of product 
      await Product.findAll()
        .then(products => {
          res.render('products', {
            prods: products,
            pageTitle: 'Express Shop',
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
          });
        })
        .catch(err => console.log(err));
    } else {
      // Password does not match
      res.status(401).send({ message: "Authentication failed. Wrong password." });
    }


  } else {
    // req.session.isLoggedIn = true;
    console.log("Wrong password or username!")
    req.session.isLoggedIn = false;
    res.redirect('/');
  }

};

//============== UPDATE OUR GROUP CODE 
// signup
exports.postSignup = (req, res, next) => {
  const fullname = req.body.fullname;
  const useremail = req.body.email;
  const password = req.body.password;
  const userconfirmedpassword = req.body.confirmPassword;

  //check two password and confirmedpassword is the same or not
  if (password === userconfirmedpassword) {

    //Create hash for users'password
    Bcrypt.hash(password, 12)
      .then(hashedPassword => {
        return User.create({
          email: useremail,
          name: fullname,
          password: hashedPassword
        })
      })
      .then(result => {
        console.log("User Created");
        res.redirect('/login');
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          console.error('Email already exists');
          res.redirect('/signup');
        }
      })
  } else {
    console.error('The confirmed password is different from the passowrd!');
    res.redirect('/signup');
  }

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
   
    console.log(err);
    res.redirect('/');
  });
};

