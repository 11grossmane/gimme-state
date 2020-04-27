"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diff = __importStar(require("diff"));
var util_1 = __importDefault(require("util"));
var colors = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    green: '\x1b[32m'
};
function gimme(_a) {
    var getState = _a.getState;
    return function (next) { return function (action) {
        var labels = {
            beforeDispatch: colors.magenta + 'Before Dispatch: ' + colors.white,
            action: colors.cyan + 'Action: ' + colors.white,
            afterDispatch: colors.green + 'After Dispatch: ' + colors.white
        };
        console.log(labels.beforeDispatch, getState());
        console.log(labels.action, action);
        var returnValue = next(action);
        console.log(labels.afterDispatch, getState());
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
    return function logger(_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            var options = parseOptions(customOptions);
            var labels = options.fullColors
                ? {
                    beforeDispatch: colors.magenta + 'Before Dispatch: ',
                    action: colors.cyan + 'Action: ',
                    afterDispatch: colors.green + 'After Dispatch: '
                }
                : {
                    beforeDispatch: colors.magenta + 'Before Dispatch: ' + colors.white,
                    action: colors.cyan + 'Action: ' + colors.white,
                    afterDispatch: colors.green + 'After Dispatch: ' + colors.white
                };
            if (options.before) {
                console.log(labels.beforeDispatch, getState());
            }
            if (options.action) {
                console.log(labels.action, action);
            }
            // Call the next dispatch method in the middleware chain.
            var returnValue = next(action);
            if (options.after) {
                console.log(labels.afterDispatch, getState());
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue;
        }; };
    };
}
exports.customGimme = customGimme;
function gimmeDiff(_a) {
    var getState = _a.getState;
    return function (next) { return function (action) {
        var beforeState = util_1.default.inspect(getState(), {
            showHidden: false,
            depth: null
        });
        var returnValue = next(action);
        var afterState = util_1.default.inspect(getState(), {
            showHidden: false,
            depth: null
        });
        var changed = diff.diffWordsWithSpace(beforeState, afterState);
        var constructedDiff = '';
        changed.forEach(function (part) {
            var label;
            var color;
            if (part.added) {
                constructedDiff += colors.green + part.value;
            }
            else if (part.removed) {
                constructedDiff += colors.red + part.value;
            }
            else {
                constructedDiff += colors.white + part.value + colors.white;
            }
        });
        console.log(colors.cyan + 'Diff: ' + constructedDiff);
        return returnValue;
    }; };
}
exports.gimmeDiff = gimmeDiff;
