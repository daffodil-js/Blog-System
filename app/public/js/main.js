require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore-amd/underscore',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'validator': '../vendor/bootstrap-validator/dist/validator'
    }
});

require(['jquery'], function ($) {
    require(['validator', 'bootstrap'], function (validator, bootstrap) {
        $(function () {
            'use strict';

            registerEventHandlers();

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

            // Form Validation
            $('.form-group').append('<div class="help-block with-errors"></div>');
            $('form').validator();

            function registerEventHandlers() {
                //Attach event handlers to login and register buttons
                $(document).on('click', '#register-submit', function(){ registerUser(); });
                $(document).on('click', '#login-submit', function() { loginUser(); })
            }

            //Create new user on register button click
            function registerUser() {
                var username = $('#register-username').val();
                var password = $('#register-password').val();
                $.ajax({
                    method: "POST",
                    url: 'https://api.parse.com/1/classes/_User',
                    data: JSON.stringify({username: username, password: password}),
                    success: function(data) {
                        console.log('user created');
                    },
                    error: function() {
                        console.log('something happened');
                    }
                });
            }

            //Login user on login button click
            function loginUser() {
                var username = $('#login-username').val();
                var password = $('#login-password').val();
                $.ajax({
                    method: "GET",
                    url: 'https://api.parse.com/1/login',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function(data) {
                        console.log('user successfully logged');
                        sessionStorage.userId = data.objectId;
                        sessionStorage.sessionToken = data.sessionToken;
                        sessionStorage.name = data.username;
                        window.location.replace("/user");
                    },
                    error: function() {
                        console.log('something happened');
                    }
                });
            }
        }());
    });

});

//require(['underscore'], function (_) {
//    if (_) {
//        console.log('Hello from underscore!');
//    }
//});

