import { Dispatch, AnyAction } from 'redux';
declare type MiddlewareReturn = (next: Dispatch<AnyAction>) => (action: any) => any;
export declare function gimme({ getState }: any): MiddlewareReturn;
export interface GimmeOptions {
    [index: string]: boolean | undefined;
    before?: boolean;
    action?: boolean;
    after?: boolean;
    fullColors?: boolean;
}
export declare function customGimme(customOptions?: GimmeOptions): any;
export declare function gimmeDiff({ getState }: any): MiddlewareReturn;
export {};
