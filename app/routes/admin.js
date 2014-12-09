var express = require('express'),
    adminRouter = express.Router();

/* GET pages */
adminRouter.get('/', function (req, res) {

    if (Parse.User.current()) {
        var queryRole = new Parse.Query(Parse.Role);
        queryRole.equalTo('name', 'admins');
        queryRole.first({
            success: function (result) { // Role Object
                var adminRelation = new Parse.Relation(result, 'users'),
                    queryAdmins = adminRelation.query();

                queryAdmins.equalTo('objectId', Parse.User.current().id);
                queryAdmins.first({
                    success: function (admin) { // User Object
                        if (admin) {
                            var page = req.originalUrl.split('/')[2] || 'home';

                            res.render('admin', {
                                page: 'pages/admin/' + page,
                                title: page,
                                users: new Parse.Query(Parse.User)
                            });
                        }
                        else {
                            res.redirect('/');
                        }
                    }
                });
            },
            error: function (error) {
                res.redirect('/');
            }
        });
    }
    else {
        res.redirect('/');
    }
});

adminRouter.post('/', function (req, res) {
    var image = req.body.image,
        title = req.body.title,
        user = Parse.User.current(),
        category = req.body.category,
        slug = req.body.slug,
        label = req.body.label,
        tags = req.body.tags,
        body = req.body.body;

    var Post = Parse.Object.extend('Post'),
        newPost = new Post();

    newPost.set('image', image);
    newPost.set('title', title);
    newPost.set('user', user);
    //newPost.set('category', category);
    newPost.set('slug', slug);
    newPost.set('label', label);
    //newPost.set('tags', tags);
    newPost.set('body', body);

    newPost.save(null, {
        success: function(newPost) {
            res.redirect('/');
            console.log('New object created with objectId: ' + newPost.id);
        },
        error: function(newPost, error) {
            res.redirect('/admin');
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
});

module.exports = adminRouter;