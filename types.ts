import { Request, Response} from 'express';

// Lib indentifer
export const FAPI = Symbol.for('FAPI');


// Http method
export const Methods = {
    get    : Symbol.for('GET'),
    post   : Symbol.for('POST'),
    put    : Symbol.for('PUT'),
    delete : Symbol.for('DELETE'),
};


export type excuteFunction = {value: any, name: string};



// Validator
export type ParamsExcuteFunction = (value: any, info: any, type: any, req: Request, res: Response) => Promise<any>;
export type ParamsDescription    = {types : symbol[], description: any};

// Method params symbol
export const paramsInfo            : symbol   = Symbol.for('global');