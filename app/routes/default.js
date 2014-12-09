var express = require('express'),
    router = express.Router();

/* GET pages */
router.get('*', function (req, res) {
    var url = req.originalUrl.split('/'),
        page = url[1] || 'home',
        title = page.charAt(0).toUpperCase() + page.slice(1) || 'Home',
        Category = GLOBAL.Parse.Object.extend('Category'),
        categoryQuery = new Parse.Query(Category);

    if (!page || page === 'home' || page === 'post') {
        var Post = GLOBAL.Parse.Object.extend('Post'),
            postQuery = new Parse.Query(Post);
        postQuery.include('user');
        postQuery.include('comment');

        if (page === 'post') {
            postQuery.equalTo('objectId', url[2].split('-')[0]);
        }

        if (page === 'category') {
            categoryQuery.equalTo('category', url[2].split('-')[0]);
        }

        postQuery.find({
            success: function (posts) {
                res.render('default', {
                    page: 'pages/home',
                    title: title,
                    posts: posts
                });
            },
            error: function () {

            }
        });
    }
    else if (((page === 'login' || page === 'register') && Parse.User.current()) ||
        (page === 'profile' && !Parse.User.current())) {
        res.redirect('/');
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

router.post('/post/:id', function (req, res) {
    var title = req.body.title,
        content = req.body.content;

    var Comment = Parse.Object.extend('Comment'),
        newComment = new Comment();

    newComment.set('title', title);
    newComment.set('content', content);
    //newComment.set('user', Parse.User.current());

    newComment.save(null, {
        success: function(newComment) {
            res.redirect('/post/' + req.originalUrl.split('/')[2]);
            console.log('New object created with objectId: ' + newComment.id);
        },
        error: function(newPost, error) {
            res.redirect('/');
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
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