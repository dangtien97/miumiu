import { Request, Response, NextFunction} from 'express';
import { ParamsExcuteFunction } from '../types';
import { log, cast } from '../functions';



export const key = Symbol.for('HeaderParam');

export function HeaderParam(name: string){
    return log(key, {name, at: 'header field'});
}



export const excute : ParamsExcuteFunction = async function excute  (value: any, info: any, type: any, req : any, res : Response) : Promise<any>{
    return cast(req.headers[info.name], info.name, type);
}


