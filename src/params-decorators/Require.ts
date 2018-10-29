import { Request, Response, NextFunction} from 'express';
import { ParamsExcuteFunction } from '../types';

import { log } from "./metadata";



export const key = Symbol.for('Require');

export function Require(){
   return log(key, {});
}



export const excute : ParamsExcuteFunction = async function excute  (value: any, info: any, type: any, req: Request, res : Response) : Promise<any>{
    if(value == undefined ) throw `Require ${info.name} at ${info.at}`;
    return value;
}


