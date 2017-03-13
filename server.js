var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');

var User = require('./app/models/user');
var Hangout = require('./app/models/hangout');

//Yelp
var request = require('request');
var qs = require('querystring');

var fs = require('fs');

var Promise = require('bluebird');

// This asks for the POST information to be application/x-www-urlencoded
// Instead of using data: {key: value} format.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

//Database Part************************
var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(morgan('dev'));


//Authentication with Passport
// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//   clientID: '1339417492768524', 
//   clientSecret: 'b6aada4109d1e978da7206aa0f3096bc',
//   callback: 'http://localhost:8000'
// }, function (accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function (err, user) {
//       if (err) return done(err);
//       done(null, user);
//     });
//   }
// ));

// Routing Part Just ignore everything below this line for ease. I'll figure it out later
//   Created 2 routers. One for 'localhost/' and 'localhost/api'. I coulda used 1, but why not 2
var router = express.Router();
//var apiRouter = express.Router();
import apiRouter from './app/routing/api_router';

// Need to initialize this here
router.use(function (req, res, next) {
  next();
});


// If you go to 'localhost/' then send the index.html file.
// The reason why this works is I'm using the variable 'router', not 'apiRouter'. 
// 'router' is bound below, in my `app.use('/', router);`

router.get('/', function (req, res) {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
  });
});


router.get('/choose', function (req, res) {
  fs.readFile('./public/choose.html', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
  });
});


router.get('/login', function (req, res) {
  fs.readFile('./public/login.html', 'utf8', (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

router.get('/css/:css', function (req, res) {
  fs.readFile('./public/css/' + req.params.css, 'utf8', (err, data) => {
    res.send(data);
  });
});

router.get('/js/:js', function (req, res) {
  fs.readFile('./public/js/' + req.params.js, 'utf8', (err, data) => {
    res.send(data);
  });
});

// // Initialization. But this time, it's for 'localhost/api'
// apiRouter.use(function (req, res, next) {
//   next();
// });
//
// // I do it this way because it's one route and I'm only doing 'get' on it
// apiRouter.get('/', function (req, res) {
//   res.json({ message: 'Hooray! Welcome to our API!'});
// });
//
// apiRouter.post('/', function(req, res) {
//   res.json({ message: 'Yay Post' });
// });
//
// // This is the biggie.
// // So when you get a Post, create the user. When you receieve a Get, get all users.
//
// // The reason why it's different from above is I'm trying to handle Post and Get requests
//
// apiRouter.route('/user')
//   .post(function (req, res) {
//     var user = new User();
//     // user.username = req.body.username;
//     // //user.password = req.body.password;
//     // user.email = req.body.email;
//     // user.name = req.body.name;
//     // user.age = req.body.age;
//     // user.gender = req.body.gender;
//     // user.biography = req.body.biography;
//     user.fbToken = req.body.fbToken;
//     // user.admin = 0;
//     User.findOne({'fbToken': req.body.fbToken}, (err, _USER) => {
//       //Dirty solution to check to see if a user has been created yet.
//       if (_USER) return;
//
//       //If it's a new user, create the user
//       user.save(function (err) {
//         if (err) {
//           res.send(err);
//           return;
//         }
//         res.json({message: 'User Created!'});
//       });
//     });
//   })
//
//   .get(function (req, res) {
//     User.find(function (err, users) {
//       if (err) {
//         res.send(err);
//         return;
//       }
//       res.json(users);
//     });
//   });
//
//
// // The '/user/:user_id' is this:
// // :user_id is stored inside req.params.user_id
// // :chess_war would be automatically stored inside req.params.chess_war
// // :hey is stored in req.params.hey
//
// // So if you did a Get request to '/user/gagaga', and it was written '/user/:name'
// // You can access 'gagaga' in req.params.name
//
// // User.findById is probably a mongoose method used to interface with the mongo db
//
//
// apiRouter.route('/user/:user_id')
//   .get(function (req, res) {
//     //User.findById(req.params.user_id, function (err, user) {
//     User.findOne({'fbToken': req.params.user_id}, function (err, user) {
//       if (err) {
//         res.send(err);
//         return;
//       }
//
//       res.json(user);
//     });
//   })
//
//   .put(function (req, res) {
//     User.findOne({ 'fbToken': req.params.user_id }, (err, user) => {
//       if (err) {
//         res.send(err);
//         return;
//       }
//       handlePut(err, user, req, res);
//     });
//   })
//
//   //change this for the love of god as a soft delete
//   .delete(function (req, res) {
//     User.remove({
//       _id: req.params.user_id
//     }, function (err, user) {
//       if (err) {
//         res.send(err);
//         return;
//       }
//
//       res.json({ message: 'Successfully Deleted' });
//     });
//   });
//
// function handlePut(err, user, req, res) {
//   if (err) {
//     res.send('Error Saving User. Please try again.');
//     return;
//   }
//   if (req.body.username) user.username = req.body.username;
//   //user.password = req.body.password;
//   if (req.body.email) user.email = req.body.email;
//   if (req.body.name) user.name = req.body.name;
//   if (req.body.age) user.age = req.body.age;
//   if (req.body.gender) user.gender = req.body.gender;
//   if (req.body.biography) user.biography = req.body.biography;
//   //user.fbToken = req.body.fbToken;
//
//   user.save(function (err) {
//     if (err) {
//       res.send(err);
//       return;
//     }
//     res.json({message: 'User Updated'});
//   })
// }



// Yelp ****************************
// Refresh this token every 100 days

var yelpToken = config.yelpToken;

// Remove this for now. We could use it, but it counts towards our API calls. We only get 25k.
// Save the oAuth2.0 token for later. They're valid for 150 days. Every 100 days, get a new one.

// var request_yelp = function (set_parameters, callback) {
//   //Get token first
//   request({
//     method: 'POST', 
//     url:'https://api.yelp.com/oauth2/token', 
//     headers: {'content-type': 'application/x-www-form-urlencoded'}, 
//     form:{'client_id': process.env.client_id, 'client_secret': process.env.client_secret, grant_type: 'client_credentials'}
//   }, cb);

// };

var hangoutRouter = express.Router();
var yelpRouter = express.Router();

yelpRouter.use(function (req, res, next) {
  next();
});

yelpRouter.route('/')
  .get(function (req, res) {
    fs.readFile('./public/yelp.html', 'utf8', (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });

hangoutRouter.use(function (req, res, next) {
  next();
});

hangoutRouter.route('/')
  .get(function (req, res) {
    res.json({ 'message': 'Welcome to the Hangouts API' });
  })
  
hangoutRouter.route('/user/:user_id')
  
  //GET: Returns the user
  .get(function (req, res) {
    Hangout.findOne({
      $or: [
        {'first_person': req.params.user_id}, 
        {'second_person': req.params.user_id}
      ]}, (err, hangoutObject) => {
        console.log(hangoutObject);
        res.json(hangoutObject);
    });
  })

  //POST: Searches the database for an empty secondPerson. If it finds an open date, 
  //      If it can't, 
  //      Creates new date object in DB. Populates the firstPerson and Event simultaneously      
  .post(function (req, res) {
    let hangout = new Hangout();

      hangout.first_person = req.body.first_person;
      hangout.activity = JSON.parse(req.body.activity);

      hangout.save(function (err) {
        if (err) {
          res.json('Error', err);
          return;
        }
        res.json({ 'message': 'hangout saved' });
      })
  })

  //PUT: Adds to User Document in the Database (Used for restaurant finder and user finder)
  .put(function (req, res) {
    Hangout.findOne({
      $or: [
        {'first_person': req.params.user_id},
        {'second_person': req.params.user_id}
      ]}, (err, hangoutObject) => {
        console.log(hangoutObject.activity);
        res.json(hangoutObject);
      }
    );
  });

// localhost:8000/api/chicken/nuggets

// localhost:8000

// Router:        /
// apiRouter:     /api/
// hangoutRouter: /api/hangout/

// apiRouter.route('/chicken/nuggets')
//   .get((req, res) => {
//     res.json({gwen: 'is cool'});
//   })

hangoutRouter.route('/test')
  .get(function (req, res) {
    Hangout.findOne({ 'activity.display_phone': '(949) 786-9625' }, function(err, hangout) {
      console.log(err);
      res.json(hangout);
    })
  })

hangoutRouter.route('/hangout/:hangout_id')
  .get(function (req, res) {
    Hangout.findById(req.params.hangout_id, (err, hangoutObject) => {
      console.log(hangoutObject.activity.rating);
      res.json(hangoutObject);
    });
  });

//This can probably be a GET request
hangoutRouter.route('/restaurant')
  .post(function (req, res) {

    //TPADD Planning to use the DB to pull the location
    req.body.latitude = 33.6506;
    req.body.longitude = -117.7435; //irvine spectrum

    //If you want a smaller restaurant pool, then choose this
    req.body.price = '1,2';
    req.body.limit = 20;

    //This can be vegan and/or vegetarian or anything
    let categories = ['restaurants'];


    let promiseArray = getEvent(req.body, categories);

    //When they all resolve, I'm gonna return all the values. This is an array of yelp objs
    Promise.all(promiseArray).then(values => {
      let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
            .restaurants.businesses;
      let randomizedRestaurant = randomizeSelection(restaurantListObject)

      res.status(200).json(randomizedRestaurant);
    }).catch(err => {console.log(err)});
  })

hangoutRouter.route('/activity')
  .post(function (req, res) {
    console.log('Activity Endpoint Called');
    req.body.latitude = 33.6506;
    req.body.longitude = -117.7435; //irvine spectrum

    //If you want less activities, then change this
    req.body.limit = 3;

    //TPADD Planning on making these categories dynamic based on the week
    let categories = ['movietheaters', 'bowling', 'museums', 'artclasses'];

    //I get an array of promises from getEvent, one for each category. 
    let promiseArray = getEvent(req.body, categories);

    //When they all resolve, I'm gonna return all the values. This is an array of yelp objs
    Promise.all(promiseArray).then(values => {
      let activityListObject = convertValueArrayAndCategoriesToObject(values, categories);
      res.status(200).json(activityListObject);
    }).catch(err => {console.log(err)});
  })

app.use('/api/yelp', yelpRouter);
app.use('/api/hangout', hangoutRouter);

// This returns an array of promises. This is misnamed. This can be an activity or restaurant. 

function getEvent(params, categories) {
  params['sort_by'] = 'rating';
  //params.radius = params.radius || 22500; //meters

  var promiseArray = categories.map(item => {
    //For every category, get Yelp data for that category
    params.radius = 500; //meters
    params.categories = item;
    return getYelpData(params);
  });

  return promiseArray;
}

//Please do not call this directly. Call getEvent. 
function getYelpData(params) {
  let paramString = qs.stringify(params);
  return new Promise((resolve, reject) => {
    recursiveYelpHandler(paramString);

      


    // I'm sorry about this. This is to handle the fact that I can't figure out how to nest promises
    function recursiveYelpHandler(paramStr) {
      request({
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?' + paramStr,
        headers: {
          //Token is global
          Authorization: 'Bearer ' + yelpToken
        }
      }, (err, _, body) => {
        body = parseJSON(body);

        let paramObject = qs.parse(paramStr);

        if (body.total < paramObject.limit && paramObject.radius < 40000) {
          //Expand range if not enough
          //console.log(paramObject.categories, paramObject.radius);
          paramObject.radius *= 2;
          paramStr = qs.stringify(paramObject);
          recursiveYelpHandler(paramStr);;
        } else if (body.total < paramObject.limit) {
          //If range is too large, give up
          reject("Error: Out of Range");
        } else if (body.total >= paramObject.limit) {
          //It worked!
          resolve(body);
        } else {
          //???
          console.log("Cosmic Rays at getEvent");
        }
      });
    }








  })
}




//Always wrap your JSON.parse in a try-catch block. This simply replaces JSON.parse with the safer version
function parseJSON(item, times = 0) {
  try {
    return JSON.parse(item);
  } catch (e) {
    if (times < 3) {
      return parseJSON(item, ++times);
    } else {
      console.log(e);
      return {'error': 'Random String: crnaF27Qgw'};
    }
  }
}


//This helper function just makes [restaurant] & [{yelpObj}, {yelpObj}] into 

// {
//   restaurant: {
//     businesses: [
//       {yelpObj}, 
//       {yelpObj}
//     ]
//   }
// }

function convertValueArrayAndCategoriesToObject(valueArray, categories) {
  let valueObject = {};
  for (let i = 0; i < categories.length; i++) {
    valueObject[categories[i]] = valueArray[i];
  }
  return valueObject;
}

function getRestaurant(params, res) {

  //Use the token to gain access
  //token = parseJSON(body)['access_token'];
  //console.log(process.env.token);
  
  //   Epoch timestamp: 1488034800
  //   Timestamp in milliseconds: 1488034800
  //   Use 1488034800
  //   Human time (GMT): Sat, 25 Feb 2017 15:00:00 GMT
  //   Human time (your time zone): 2/25/2017, 7:00:00 AM

  //term=restaurants&latitude=' + params.lat + '&longitude=' + params.long + '&limit=2&price=1,2&sort_by=rating&radius=500&open_at=1488034800
  //params.term = 'restaurants';
  //params.term = 'activities';
  params.limit = 20;
  params.price = '1,2';
  params['sort_by'] = 'rating';
  params.radius = params.radius || 500; //meters
  var paramString = qs.stringify(params);
  //console.log(paramString);

  request({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search?' + paramString,
    headers: {
      Authorization: 'Bearer ' + yelpToken
    }
  }, (err, _, body) => {
    body = parseJSON(body);
    //console.log(body.total);

    if (body.total < 3 && params.radius < 25000) {
      params.radius *= 2;
      getYelpData(params, res);
    } else if (body.total < 3) {
      res.end("Error: Out of Range");
    } else if (body.total > 3) {
      randomizeSelection(body, res);
    }
  });

  //fs.writeFile('./losangeles.json', body, 'utf-8');
}

function randomizeSelection(choicesObject) {
  let index = Math.floor(Math.random() * Object.keys(choicesObject).length);
  let selection = choicesObject[index];;
  console.log(selection);
  return selection;
}

//getYelpData({ latitude: '33.946232', longitude: '-117.678676', 'open_at': 1488672409 });



// ************************
// Register Our Routes Here
// ************************

app.use('/', router);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('Magic happens on port ' + port); 
});