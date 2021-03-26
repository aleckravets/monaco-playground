import {app} from '../app';
import $ from "jquery";
import {typeset} from "./mathJax";

app.config(($stateProvider) => {
    $stateProvider
        .state('mathjax', {
            parent: 'layout',
            url: "/math",
            template: `
                    <div>
                        <h2>Math</h2>
                        <button ng-click="mathCtrl.convert()">Convert</button>
                        <div id="math">
                            <h1>Math Expression Example</h1>
                            <p>Square root: $\\sqrt{x^2+1}$</p>
                            <p>
                                When $a \\ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
                                $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$
                            </p>
                            <p>
                                $$F(k) = \\int_{-\\infty}^{\\infty} f(x) e^{2\\pi i k} dx$$
                            </p>
                        </div>
                    </div>`,
            controller: MonacoController,
            controllerAs: 'mathCtrl',
        });
});

class MonacoController {
    constructor() {
    }

    convert() {
        typeset($("#math").get());
    }
}


