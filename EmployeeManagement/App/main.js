requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'bootstrap': '../Scripts/bootstrap',
        'toastr': '../Scripts/toastr',
        'moment': '../Scripts/moment'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'services/logger', 'toastr'], function (system, app, viewLocator, router, logger, toastr) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Employees management';

    app.configurePlugins({
        router: true,
        dialog: true,
        observable: true
    });

    app.start().then(function () {
        toastr.options.timeOut = 1000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.backgroundpositionClass = 'toast-top-right';
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');

        router.handleInvalidRoute = function (route, params) {
            logger.logError('No route found', route, 'main');
        };
    });
});