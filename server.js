var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

/*Database Part*/
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(morgan('dev'));

/*Routing Part Just ignore everything below this line for ease. I'll figure it out later*/
/*Created 2 routers. One for 'localhost/' and 'localhost/api'. I coulda used 1, but why not 2*/
var router = express.Router();
var apiRouter = express.Router();

/*Need to initialize this here*/
router.use(function(req, res, next) {
  next();
});

/*
If you go to 'localhost/' then send the index.html file.
The reason why this works is I'm using the variable 'router', not 'apiRouter'. 
'router' is bound below, in my `app.use('/', router);`
*/
router.get('/', function(req, res) {
  fs.readFile('./login.html', 'utf8', (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

/*Initialization. But this time, it's for 'localhost/api'*/
apiRouter.use(function(req, res, next) {
  next();
});

/*I do it this way because it's one route and I'm only doing 'get' on it*/
apiRouter.get('/', function(req, res) {
  res.json({ message: 'Hooray! Welcome to our API!'});
});

/*This is the biggie.
So when you get a Post, create the user. When you receieve a Get, get all users.

The reason why it's different from above is I'm trying to handle Post and Get requests
*/
apiRouter.route('/user')
  .post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    //user.password = req.body.password;
    user.email = req.body.email;
    user.name = req.body.name;
    user.age = req.body.age;  
    user.gender = req.body.gender;
    user.biography = req.body.biography;
    user.admin = 0;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: 'User Created!'});
    });
  })

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });


/*The '/user/:user_id' is this:
:user_id is stored inside req.params.user_id
:chess_war would be automatically stored inside req.params.chess_war
:hey is stored in req.params.hey

So if you did a Get request to '/user/gagaga', and it was written '/user/:name'
You can access 'gagaga' in req.params.name

User.findById is probably a mongoose method used to interface with the mongo db
*/

apiRouter.route('/user/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  })

  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, bear) {
      if (err) {
        res.send(err);
      }
      user.username = req.body.username;
      //user.password = req.body.password;
      user.email = req.body.email;
      user.name = req.body.name;
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.biography = req.body.biography;

      user.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'User Updated'});
      })
    })
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully Deleted' });
    });
  });




/*Register Our Routes Here*/

app.use('/', router);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('Magic happens on port ' + port); 
});
