export declare function gimme({ getState }: any, options?: {
    before: boolean;
    action: boolean;
    after: boolean;
}): (next: any) => (action: any) => any;
export interface GimmeOptions {
    [index: string]: boolean | undefined;
    before?: boolean;
    action?: boolean;
    after?: boolean;
    fullColors?: boolean;
}
export declare function customGimme(customOptions?: GimmeOptions): any;
