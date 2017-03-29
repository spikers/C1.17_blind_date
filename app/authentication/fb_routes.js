//import user from './facebook_passport';

module.exports = function(app, passport) {
// LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/?fbtoken='+req.user.fbToken);
    });
//console.log('passport', passport);
//console.log('app', app);

// AUTHENTICATE (FIRST LOGIN) ==================================================
    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            //successRedirect: '/?fbtoken='+req.user.fbToken,
            failureRedirect: '/'
        }), function (req, res) {
        console.log('++++++++++++req+++++++++', req.user.fbToken);
        res.redirect('/?fbtoken='+req.user.fbToken);
        }
    );

// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            //successRedirect: '/?fbtoken='+req.user.fbToken,
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/?fbtoken='+req.user.fbToken)
        }
    );

// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/?fbtoken='+req.user.fbToken);
        });
    });


// // LOGOUT ==============================
// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });
// };

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/?fbtoken='+req.user.fbToken);
}};