require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore-amd/underscore'
    }
});

require(['jquery'], function ($) {
    $(function () {
        'use strict';

        // target _blank to all external links
        $('body a').each(function () {
            if (this.href.indexOf(location.hostname) === -1) {
                $(this).attr('target', '_blank');
            }
        });

        // Setup Parse.com API
        $.ajaxSetup({
            headers: {
                'X-Parse-Application-Id': 'TgePKQZ0V5ILd4oSi6iXce2x5e2hYnJdpb26am3a',
                'X-Parse-REST-API-Key': 'nl4VVJVTrFoAE6ts5ooqGYQahRBc084EHc3IMGRg'
            }
        });

        // Get Parse.com data
        function getData(table) {
            $.ajax({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/' + table,
                success: function (data) {
                    $('#container').append(JSON.stringify(data.results) + '<br><br>');
                },
                error: function () {
                    console.log('Opss...');
                }
            });
        }

        // All Categories
        getData('Category');

        // All Posts
        getData('Post');

        // All Users
        getData('User');

    }());
});

require(['underscore'], function (_) {
    if (_) {
        console.log('Hello from underscore!');
    }
});