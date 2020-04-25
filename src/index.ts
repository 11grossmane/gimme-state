export function gimme(
    { getState }: any,
    options = { before: true, action: true, after: true }
) {
    return (next: any) => (action: any) => {
        if (options.before) {
            console.log('\x1b[35m', 'Before Dispatch: ', getState())
        }
        if (options.action) {
            console.log('\x1b[36m', 'Action: ', action)
        }

        const returnValue = next(action)
        if (options.after) {
            console.log('\x1b[32m', 'After Dispatch: ', getState())
        }
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
    console.log('gimme options are ', customOptions)
    return function logger({ getState }: any) {
        return (next: any) => (action: any) => {
            let options = parseOptions(customOptions)
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
            if (options.before) {
                console.log(colors.magenta, 'Before Dispatch: ', getState())
            }

            if (options.action) {
                console.log(colors.cyan, 'Action: ', action)
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
