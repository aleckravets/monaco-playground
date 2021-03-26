import {app} from '../app';

app.config(($stateProvider) => {
    $stateProvider
        .state('layout', {
            abstract: true,
            url: '?param1',
            template: `
                <div>
                    <ul>
                        <li><a ui-sref="home">Home</a></li>
                        <li>
                            <span>Reports</span>
                            <ul>
                                <li><a href="/report/PL">PL</a></li>
                                <li><a href="/report/PVCF">PVCF</a></li>
                            </ul>
                        </li>
                        <li><a href="/monaco">Monaco</a></li>
                        <li><a href="/math">MathJax</a></li>
                    </ul>
                    <ui-view></ui-view>
                </div>`,
            controller: LayoutController,
            controllerAs: 'layoutCtrl',
            reloadOnSearch: false
        });
});

class LayoutController {
    constructor($state, $stateParams, $location) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;

        console.log('layout');
    }
}
