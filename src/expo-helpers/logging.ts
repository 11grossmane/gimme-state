//https://github.com/expo/expo/blob/master/packages/expo/src/logs/Logs.ts

// import { createRemoteConsole } from './remote-console'
let Logs: any = undefined

try {
    Logs = require('expo').Logs
} catch (e) {
    //ignore error
}

export const controlExpoLogging = (): void => {
    //if this is an a projet that contains, control cli logging, otherwise, return a function that does nothing
    if (Logs) {
        // https://stackoverflow.com/a/42839384/1123156
        const isRemoteDebuggingEnabled = typeof atob !== 'undefined'
        if (isRemoteDebuggingEnabled) {
            Logs.disableExpoCliLogging()
        } else {
            Logs.enableExpoCliLogging()
        }
    }
}

export const disableCliLogging = () => {
    const isRemoteDebuggingEnabled = typeof atob !== 'undefined'
    if (Logs && isRemoteDebuggingEnabled) {
        return Logs.disableExpoCliLogging()
    }
    return () => {}
}

export const enableCliLogging = () => {
    const isRemoteDebuggingEnabled = typeof atob !== 'undefined'
    if (Logs && !isRemoteDebuggingEnabled) {
        return Logs.enableExpoCliLogging()
    }
    return () => {}
}

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
