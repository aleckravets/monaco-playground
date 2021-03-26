import $ from "jquery";
import {app} from '../app';

app.config(($stateProvider) => {
        $stateProvider
            .state('monaco', {
                parent: 'layout',
                url: "/monaco",
                template: `
                    <div>
                        <h2>Monaco Editor</h2>
                        <button ng-click="monacoCtrl.initMonaco()">Init monaco</button>
                        <div id="container" height="400px"></div>
                    </div>`,
                controller: MonacoController,
                controllerAs: 'monacoCtrl',
            });
    });

const opts = {
    value:
        `if (pos > 0)
{
    args = grouping.Substring(pos + 1, grouping.Length - pos - 2);
    grouping = grouping.Substring(0, pos);
}`,
    language: 'csharp',
    // automaticLayout: true,
    lineNumbers: 'off',
    minimap: { enabled: false },
    // folding: false,
    scrollbar: { vertical: 'hidden' },
    scrollBeyondLastLine: false,
    renderIndentGuides: false,
    wordWrap: 'on',
    renderLineHighlight: 'none',
    lineDecorationsWidth: 0,
    theme: 'vs-dark'
};

class MonacoController {
    constructor($element) {
        this.container = $($element).find('#container').get(0);

        console.log('monaco');
    }

    initMonaco() {
        require.ensure(['monaco-editor'], require => {
            const monaco = require('monaco-editor');

            const editor = monaco.editor.create(this.container, opts);

            const adjustHeight = () => {
                const lineCount = editor._modelData.viewModel.getLineCount();
                const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
                $(this.container).height(lineCount * lineHeight);
                editor.layout();
            };

            setTimeout(adjustHeight);

            editor.onDidChangeModelContent(() => {
                adjustHeight();
            });

            editor._contributions["editor.contrib.folding"].foldingModel.onDidChange(adjustHeight)

            // const el = $(`<span data-lang="csharp">${JSON.stringify('abc')}</span>`).get(0);
            //
            // $(document.body).append(el);
            //
            // monaco.editor.colorizeElement(el, null).then(() => {
            //     console.log(el.outerHTML);
            // });

        });
    }
}
