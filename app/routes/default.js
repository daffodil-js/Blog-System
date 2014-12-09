var express = require('express'),
    router = express.Router();

/* GET pages */
router.get('*', function (req, res) {
    var url = req.originalUrl.split('/'),
        page = url[1],
        title = page.charAt(0).toUpperCase() + page.slice(1),
        Category = GLOBAL.Parse.Object.extend('Category'),
        categoryQuery = new Parse.Query(Category);

    if (page === '' || page === 'home' || page === 'post') {
        page = page || 'home';
        title = title || 'Home';

        var Post = GLOBAL.Parse.Object.extend('Post'),
            postQuery = new Parse.Query(Post);
        postQuery.include('user');

        if (page === 'post') {
            page = 'home';
            postQuery.equalTo('objectId', url[2].split('-')[0]);
        }

        postQuery.find({
            success: function (result) {
                res.render('default', {
                    page: 'pages/' + page,
                    title: title,
                    posts: result
                });
            },
            error: function () {

            }
        });
    }
    else if (page === 'logout') {
        Parse.User.logOut();
        res.redirect('/');
    }
    else {
        res.render('default', {
            page: 'pages/' + page,
            title: title
        });
    }
});

router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    Parse.User.logIn(username, password, {
        success: function (user) {
            res.redirect('/');
        },
        error: function (user, error) {
            res.redirect('/login');
        }
    });
});

router.post('/register', function (req, res) {

    var username = req.body.username,
        password = req.body.password,
        email = req.body.email,
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

module.exports = router;