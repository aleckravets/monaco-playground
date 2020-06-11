export const app = angular.module('app', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
    });