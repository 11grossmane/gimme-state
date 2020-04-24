function gimme({ getState },options={before:true,action:true,after:true}) {
    return next => action => {
        if (options.before){
            console.log('\x1b[35m%s\x1b[0m', 'BeforeDispatch: ',getState())
        }
        if (options.action){
            console.log('\x1b[36m%s\x1b[0m','Action:', action)
        }

        const returnValue = next(action)
        if (options.after){
            console.log('\x1b[32m%s\x1b[0m','After Dispatch: ',getState())
        }
        return returnValue
    }
}

function customGimme(options = { before: true, action: true, after: true }) {
    return function logger({ getState }) {
        return (next) => (action) => {
            if (options.before) {
                console.log('\x1b[35m%s\x1b[0m', 'Before Dispatch: ', getState());
            }
            if (options.action) {
                console.log('\x1b[36m%s\x1b[0m', 'Action: ', action);
            }

            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action);
            if (options.after) {
                console.log('\x1b[32m%s\x1b[0m', 'After Dispatch: ', getState());
            }
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue;
        };
    };
}

module.exports={gimme,customGimme}
