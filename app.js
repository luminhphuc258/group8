const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelizedB = require('./utils/database');
const User = require('./models/user');

//update code , add session 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csrf = require('csurf');

const server = express();
server.set('view engine', 'ejs');
server.set('views', 'views');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

// update code, add session 
// create session store in mysql
const sessionStore = new SequelizeStore({
  db: sequelizedB,
  tableName: 'sessions',
})

//object to use for csrf protection
const csrfProtection = csrf();


// setup server's session store
server.use(
  session({
    secret: 'my_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);


server.use(csrfProtection);


const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

server.use('/admin', adminRoutes);
server.use(authRoutes);

// connect with database using a default user
sequelizedB
  .sync()
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'group8',
          password: '123',
          email: 'group8@uwinnipeg.ca'
        });
        user.save();
      }
    });
    // start the server listening on port 3000
    const port = 4000;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });


// fetch our dummy user to use as Logged in user
server.use((req, res, next) => {
  User.findByPk('7897fb93-b895-4da6-aa93-b473e132ec4a')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// apply csrf protection for logged in users session
server.use((req,res, next) => {
  res.locals.isAuthenticated = req.session.isloggedin;
  res.locals.csrfToken = req.csrfToken();
  next();
  console.log('csrf token', req.csrfToken());
});
