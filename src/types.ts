import { Request, Response} from 'express';



export type excuteFunction = {value: any, name: string};



// Validator
export type ParamsExcuteFunction = (value: any, info: any, type: any, req: Request, res: Response) => Promise<any>;

export type ParamsDescription   = {
    [index : number] : {types : symbol[], description: any};
};