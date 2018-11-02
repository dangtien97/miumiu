import { Request, Response, NextFunction} from 'express';
import { ParamsExcuteFunction } from '../types';
import { log, cast } from '../functions';


export const key = Symbol.for('BodyParam');

export function BodyParam(name: string){
    return log(key, {name, at: 'body'});
}



export const excute : ParamsExcuteFunction = async function excute  (value: any,info: any, type: any, req: Request, res : Response) : Promise<any>{
    return cast(req.body[info.name], info.name, type);
}


