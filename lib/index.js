"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gimme(_a, options) {
    var getState = _a.getState;
    if (options === void 0) { options = { before: true, action: true, after: true }; }
    return function (next) { return function (action) {
        if (options.before) {
            console.log('\x1b[35m', 'Before Dispatch: ', getState());
        }
        if (options.action) {
            console.log('\x1b[36m', 'Action: ', action);
        }
        var returnValue = next(action);
        if (options.after) {
            console.log('\x1b[32m', 'After Dispatch: ', getState());
        }
        return returnValue;
    }; };
}
exports.gimme = gimme;
var parseOptions = function (options) {
    var resultOptions = {
        before: true,
        action: true,
        after: true,
        fullColors: true
    };
    for (var key in options) {
        if (resultOptions[key]) {
            resultOptions[key] = options[key];
        }
    }
    return resultOptions;
};
function customGimme(customOptions) {
    if (customOptions === void 0) { customOptions = {}; }
    console.log('gimme options are ', customOptions);
    return function logger(_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            var options = parseOptions(customOptions);
            var colors = options.fullColors
                ? {
                    magenta: '\x1b[35m',
                    cyan: '\x1b[36m',
                    green: '\x1b[32m'
                }
                : {
                    magenta: '\x1b[35m%s\x1b[0m',
                    cyan: '\x1b[36m%s\x1b[0m',
                    green: '\x1b[32m%s\x1b[0m'
                };
            if (options.before) {
                console.log(colors.magenta, 'Before Dispatch: ', getState());
            }
            if (options.action) {
                console.log(colors.cyan, 'Action: ', action);
            }
            // Call the next dispatch method in the middleware chain.
            var returnValue = next(action);
            if (options.after) {
                console.log(colors.green, 'After Dispatch: ', getState());
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue;
        }; };
    };
}
exports.customGimme = customGimme;
