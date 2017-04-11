import domain from '../../change_active_domain';
//This is http://localhost
//or..... http://wynk.world
//No ending slash

module.exports = function(app, passport) {
//Logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect(domain + '/?fbtoken='+req.user.fbToken);
    });

//Authenticate First Login
    //send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    //handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        //successRedirect: '/?fbtoken='+req.user.fbToken,
        failureRedirect: '/'
        }), function (req, res) {
            res.redirect(domain + '/?fbtoken='+ req.user.fbToken);
        }
    );

//Authorize already logged in user
    //send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));
    //handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback', passport.authorize('facebook', {
        //successRedirect: '/?fbtoken='+req.user.fbToken,
        failureRedirect: '/'
        }), function (req, res) {
            res.redirect(domain + '/?fbtoken='+req.user.fbToken)
        }
    );

//Unlink accounts, remove the token, user account will stay active in case they want to reconnect in the future
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect(domain + '/?fbtoken='+req.user.fbToken);
        });
    });

//route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    //if they aren't redirect them to the home page
    res.redirect(domain + '/?fbtoken='+req.user.fbToken);
    res.redirect('/?fbtoken='+req.user.fbToken);
}};