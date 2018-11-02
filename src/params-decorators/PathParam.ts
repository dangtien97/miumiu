import { Request, Response, NextFunction} from 'express';
import { ParamsExcuteFunction } from '../types';
import { log, cast } from '../functions';



export const key = Symbol.for('PathParam');

export function PathParam(name: string){
    return log(key, {name, at: 'path params'});
}



export const excute : ParamsExcuteFunction = async function excute  (value: any, info: any, type: any, req : any, res : Response) : Promise<any>{
    value = req.params[info.name] != undefined ? value: (req.ControllerParams[info.name] != undefined?req.ControllerParams[info.name]:undefined);
    return cast(value, info.name, type);
}


