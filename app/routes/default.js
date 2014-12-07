var express = require('express'),
    router = express.Router();

/* GET pages */
router.get('*', function (req, res) {

    var page = req.originalUrl.split('/')[1],
        title = page.charAt(0).toUpperCase() + page.slice(1),
        id = req.originalUrl.split('/')[2];

    if (page === '' || page === 'home') {
        page = 'home';
        title = 'Latest Posts';


        var Post = Parse.Object.extend('Post');
        var query = new Parse.Query(Post);

        query.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    title = object.id + ' - ' + object.get('title');
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

    if (page === 'post') {
        title = id;
    }

    res.render('default', {
        page: 'pages/' + page,
        title: title,
        id: id
    });
});

router.get('/', function (req, res) {



});

router.post('/register', function (req, res) {

    var username = req.body.username,
        password = req.body.password,
        email = req.body.email,
        //website = req.body.website,
        user = new Parse.User();

    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    user.signUp(null, {
        success: function (user) {
            res.redirect('/');
        },
        error: function (user, error) {
            res.redirect('/register');
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    Parse.User.logIn(username, password, {
        success: function(user) {
            res.redirect('/');
        },
        error: function(user, error) {
            res.redirect('/login');
        }
    });
});

module.exports = router;