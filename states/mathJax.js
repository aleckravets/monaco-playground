// http://docs.mathjax.org/en/latest/web/configuration.html#web-configuration
let queue = new Promise(resolve => {
    window.MathJax = {
        options: {
            enableMenu: false
        },
        startup: {
            // typeset: false,
            pageReady: () => {
                resolve();
            }
        },
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        }
    };

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
    script.async = true;
    document.head.appendChild(script);
});

export function typeset(element) {
    return queue = queue
        .then(() => MathJax.typesetPromise(element))
        .catch((err) => console.log('Typeset failed: ' + err.message));
}
