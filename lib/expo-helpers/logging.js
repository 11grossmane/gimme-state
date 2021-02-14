"use strict";
//https://github.com/expo/expo/blob/master/packages/expo/src/logs/Logs.ts
Object.defineProperty(exports, "__esModule", { value: true });
// import { createRemoteConsole } from './remote-console'
var Logs = undefined;
try {
    Logs = require('expo').Logs;
}
catch (e) {
    //ignore error
}
exports.controlExpoLogging = function () {
    //if this is an a projet that contains, control cli logging, otherwise, return a function that does nothing
    if (Logs) {
        // https://stackoverflow.com/a/42839384/1123156
        var isRemoteDebuggingEnabled = typeof atob !== 'undefined';
        if (isRemoteDebuggingEnabled) {
            Logs.disableExpoCliLogging();
        }
        else {
            Logs.enableExpoCliLogging();
        }
    }
};
// let _originalConsole: typeof console | null
// export function enableExpoCliLogging(): void {
//     if (_originalConsole) {
//         return
//     }
//     _originalConsole = global.console
//     global.console = createRemoteConsole(global.console)
// }
// export function disableExpoCliLogging(): void {
//     if (!_originalConsole) {
//         return
//     }
//     global.console = _originalConsole
//     _originalConsole = null
// }
