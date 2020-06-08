import $ from "jquery";

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
};

const container = $('#container');

function initMonaco() {
    require.ensure(['monaco-editor'], require => {
        const monaco = require('monaco-editor');

        const editor = monaco.editor.create(container.get(0), opts);

        const adjustHeight = () => {
            const lineCount = editor._modelData.viewModel.getLineCount();
            const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
            container.height(lineCount * lineHeight);
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

$('#init').click(() => initMonaco());



