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

function customGimme(
    options = {
        before: true,
        action: true,
        after: true,
        fullColors: true,
        fullAction: true
    }
) {
    return function logger({ getState }) {
        return (next) => (action) => {
            let append = options.fullColors ? '' : '%s\x1b[0m'
            if (!options.fullAction) action = action.type
            if (options.before) {
                console.log(
                    `\x1b[35m${append}`,
                    'Before Dispatch: ',
                    getState()
                )
            }
            if (options.action) {
                if (options.action instanceof Function) {
                    console.log(
                        `\x1b[36m${append}`,
                        'Action is a THUNK: ',
                        action
                    )
                } else console.log(`\x1b[36m${append}`, 'Action: ', action)
            }

            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action)
            if (options.after) {
                console.log(
                    `\x1b[32m%s\x1b[0m${append}`,
                    'After Dispatch: ',
                    getState()
                )
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue
        }
    }
}

module.exports = { gimme, customGimme }
