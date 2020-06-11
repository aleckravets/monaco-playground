import {app} from '../app';

app.config(($stateProvider) => {
        $stateProvider
            .state('report', {
                parent: 'layout',
                url: "/report/:reportType?param2",
                template: `
                    <div>
                        <h2>Report {{reportCtrl.$stateParams.reportType}}</h2>
                        
                        <p>Param1 = {{reportCtrl.$stateParams.param1}}</p>
                    
                        <div>
                            <div>
                                <label>
                                    Prevent navigation <input type="checkbox" ng-model="reportCtrl.preventNavigation" />
                                </label>
                            </div>
                            <div>
                                <button ng-click="reportCtrl.param1(1)">param1=1</button>
                                <button ng-click="reportCtrl.param1(2)">param1=2</button>
                                <br><br>
                                <button ng-click="reportCtrl.param2(1)">param2=1</button>
                                <button ng-click="reportCtrl.param2(2)">param2=2</button>
                            </div>
                        </div>
                    </div>`,
                controller: ReportController,
                controllerAs: 'reportCtrl',
                reloadOnSearch: false
            });
    });

class ReportController {
    constructor($scope, $state, $stateParams, $location, $rootScope) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;

        const off = $rootScope.$on('$stateChangeStart', (event) => {
            if (this.preventNavigation)
                event.preventDefault();
        });

        $scope.$on('$destroy', () => off());

        console.log('report');
    }

    param1(value) {
        this.$location.search('param1', value);
    }

    param2(value) {
        this.$location.search('param2', value);
    }
}