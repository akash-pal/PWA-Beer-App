
app.config(function ($routeProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            controller: firstPageController,
            templateUrl: 'module/firstPage/firstPage.html'
        })
        .when('/view2', {
            controller: secondPageController,
            templateUrl: 'module/secondPage/secondPage.html'
        })
        .otherwise({ redirectTo: '/' });
});