import {app} from '../app';

app.config(($stateProvider) => {
        $stateProvider
            .state('file', {
                parent: 'layout',
                url: '/file/{filePath:.*}',
                template: `
                    <div>
                        <h2>File</h2>
                        <p>{{fileCtrl.filePath}}</p>
                    </div>`,
                controller: FileController,
                controllerAs: 'fileCtrl',
            });
    });

class FileController {
    constructor($stateParams) {
        this.filePath = $stateParams.filePath;
    }
}