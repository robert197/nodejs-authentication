var User = require('./models/user');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/register', function(req, res) {
    res.render('register');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(error) {
      if(error) {
        res.send(error);
      }
      console.log('user registered');
      res.redirect('/');
    });
  });

  app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', {info: info.message});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});
}
