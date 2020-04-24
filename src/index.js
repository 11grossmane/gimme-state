function logger({ getState },options={before:true,action:true,after:true}) {
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

export default logger
