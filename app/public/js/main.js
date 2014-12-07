require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore-amd/underscore',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'validator': '../vendor/bootstrap-validator/dist/validator'
    }
});

require(['jquery'], function ($) {

    require(['validator', 'bootstrap', 'validator'], function (validator, bootstrap, validator) {
        $(function () {
            'use strict';

            registerEventHandlers();

            // Page show-up
            $('#status').fadeOut();
            $('#preloader').delay(150).fadeOut('slow');
            $('body').delay(150).css({'overflow': 'visible'});

            // target _blank to all external links
            $('body a').each(function () {
                if (this.href.indexOf(location.hostname) === -1) {
                    $(this).attr('target', '_blank');
                }
            });

            // Form Validation
            $('.form-group').append('<div class="help-block with-errors"></div>');
            $('form').validator();

            function registerEventHandlers() {
                //Attach event handlers to login and register buttons
                $(document).on('click', '#register-submit', function(){ registerUser(); });
                $(document).on('click', '#login-submit', function() { loginUser(); })
            }

        }());
    });

});

