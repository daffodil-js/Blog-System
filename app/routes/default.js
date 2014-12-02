var express = require('express'),
    router = express.Router();

/* GET pages */
router.get('*', function (req, res) {
    var page = req.originalUrl.split('/')[1],
        id = req.originalUrl.split('/')[2];

    if (page === '') {
        page = 'home'
    }

    res.render('default', {
        page: 'pages/' + page,
        title: 'The Blob | ' + page.charAt(0).toUpperCase() + page.slice(1),
        id: id
    });
});

module.exports = router;