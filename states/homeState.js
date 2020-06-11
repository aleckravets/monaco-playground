import {app} from '../app';

app.config(($stateProvider) => {
        $stateProvider
            .state('home', {
                parent: 'layout',
                url: '/',
                template: `
                    <div>
                        <h2>Home</h2>
                    </div>`,
                controller: HomeController,
                controllerAs: 'homeCtrl',
            });
    });

class HomeController {
    constructor($state, $stateParams, $location) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;

        console.log('home');
    }
}