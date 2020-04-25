import { Dispatch, AnyAction } from 'redux'
import * as diff from 'diff'
import util from 'util'

type MiddlewareReturn = (next: Dispatch<AnyAction>) => (action: any) => any
const colors = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    green: '\x1b[32m'
}

export function gimme({ getState }: any): MiddlewareReturn {
    return (next: any) => (action: any) => {
        let labels = {
            beforeDispatch: colors.magenta + 'Before Dispatch: ',
            action: colors.cyan + 'Action: ',
            afterDispatch: colors.green + 'After Dispatch: '
        }
        console.log(labels.beforeDispatch, getState())
        console.log(labels.action, action)
        const returnValue = next(action)
        console.log(labels.afterDispatch, getState())
        return returnValue
    }
}

export interface GimmeOptions {
    [index: string]: boolean | undefined
    before?: boolean
    action?: boolean
    after?: boolean
    fullColors?: boolean
}

const parseOptions = (options: GimmeOptions): GimmeOptions => {
    let resultOptions: GimmeOptions = {
        before: true,
        action: true,
        after: true,
        fullColors: true
    }
    for (let key in options) {
        if (resultOptions[key]) {
            resultOptions[key] = options[key]
        }
    }
    return resultOptions
}

export function customGimme(
    customOptions: GimmeOptions = {} as GimmeOptions
): any {
    return function logger({ getState }: any): MiddlewareReturn {
        return (next: any) => (action: any) => {
            let options = parseOptions(customOptions)
            let labels = options.fullColors
                ? {
                      beforeDispatch: colors.magenta + 'Before Dispatch: ',
                      action: colors.cyan + 'Action: ',
                      afterDispatch: colors.green + 'After Dispatch: '
                  }
                : {
                      beforeDispatch:
                          colors.magenta + 'Before Dispatch: ' + colors.white,
                      action: colors.cyan + 'Action: ' + colors.white,
                      afterDispatch:
                          colors.green + 'After Dispatch: ' + colors.white
                  }
            if (options.before) {
                console.log(labels.beforeDispatch, getState())
            }

            if (options.action) {
                console.log(labels.action, action)
            }

            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action)
            if (options.after) {
                console.log(labels.afterDispatch, getState())
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue
        }
    }
}

export function gimmeDiff({ getState }: any): MiddlewareReturn {
    return (next: any) => (action: any) => {
        const beforeState = util.inspect(getState(), {
            showHidden: false,
            depth: null
        })

        const returnValue = next(action)
        const afterState = util.inspect(getState(), {
            showHidden: false,
            depth: null
        })
        const changed = diff.diffLines(beforeState, afterState)
        process.stdout.write(colors.cyan + 'Difference: ' + colors.white)
        changed.forEach(function (part) {
            // green for additions, red for deletions
            // grey for common parts
            var color = part.added
                ? colors.green
                : part.removed
                ? colors.red
                : colors.white
            process.stdout.write(color + part.value)
        })
        console.log()
        return returnValue
    }
}
