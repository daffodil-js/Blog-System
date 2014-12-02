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
    }

    res.render('default', {
        page: 'pages/' + page,
        title: title,
        id: id
    });
});

module.exports = router;