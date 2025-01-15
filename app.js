const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');

const sequelizedB = require('./utils/database');
const User = require('./models/user');

const server = express();
server.set('view engine', 'ejs');
server.set('views', 'views');

server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path.join(__dirname, 'public')));

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
          name: 'Ummy',
          email: 'u.habiba@uwinnipeg.ca'
        });
        user.save();
      }
    });
    // start the server listening on port 3000
    const port = 3000;
    server.listen(port, () => {
    console.log(`Server listening on port ${port}`);});
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

