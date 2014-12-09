require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'validator': '../vendor/bootstrap-validator/dist/validator'
    }
});

require(['jquery'], function ($) {

    require(['validator', 'bootstrap', 'validator'], function (validator, bootstrap, validator) {
        $(function () {
            'use strict';

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

        }());
    });
});