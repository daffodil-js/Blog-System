var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'The Blob'});
});

router.get('/post', function (req, res) {
    res.render('post', {title: 'The Blob'});
});

module.exports = router;