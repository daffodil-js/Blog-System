require.config({
	paths: {
		'jquery': '../vendor/jquery/dist/jquery',
		'underscore': '../vendor/underscore-amd/underscore'
	}
});

require(['jquery'], function($) {
	if($) {
		console.log('Hello from jQuery!');
	}
});

require(['underscore'], function(_) {
	if(_){
		console.log('Hello from underscore!');
	}
});