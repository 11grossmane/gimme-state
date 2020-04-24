interface Options {
    before?: boolean
    action?: boolean
    after?: boolean
    fullColors?: boolean
}

export function gimme(): any
export function customGimme(options: Options): any
