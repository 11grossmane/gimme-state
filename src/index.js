function gimme(
    { getState },
    options = { before: true, action: true, after: true }
) {
    return (next) => (action) => {
        if (options.before) {
            console.log('\x1b[35m', 'Before Dispatch: ', getState())
        }
        if (options.action) {
            if (options.action instanceof Function) {
                console.log(`\x1b[36m`, 'Action is a THUNK: ', action)
            } else console.log('\x1b[36m', 'Action: ', action)
        }

        const returnValue = next(action)
        if (options.after) {
            console.log('\x1b[32m', 'After Dispatch: ', getState())
        }
        return returnValue
    }
}

function customGimme(customOptions) {
    return function logger({ getState }) {
        return (next) => (action) => {
            let options = {
                before:
                    customOptions.before === undefined
                        ? true
                        : customOptions.before,
                action:
                    customOptions.action === undefined
                        ? true
                        : customOptions.action,
                after:
                    customOptions.after === undefined
                        ? true
                        : customOptions.after,
                fullColors:
                    customOptions.fullColors === undefined
                        ? true
                        : customOptions.fullColors,
                fullAction:
                    customOptions.fullAction === undefined
                        ? true
                        : customOptions.fullAction
            }
            let colors = options.fullColors
                ? {
                      magenta: '\x1b[35m',
                      cyan: '\x1b[36m',
                      green: '\x1b[32m'
                  }
                : {
                      magenta: '\x1b[35m%s\x1b[0m',
                      cyan: '\x1b[36m%s\x1b[0m',
                      green: '\x1b[32m%s\x1b[0m'
                  }
            if (!options.fullAction) action = action.type
            if (options.before) {
                console.log(colors.magenta, 'Before Dispatch: ', getState())
            }
            if (options.action) {
                if (options.action instanceof Function) {
                    console.log(colors.cyan, 'Action is a THUNK: ', action)
                } else console.log(colors.cyan, 'Action: ', action)
            }

            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action)
            if (options.after) {
                console.log(colors.green, 'After Dispatch: ', getState())
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue
        }
    }
}

module.exports = { gimme, customGimme }
