
import { ParamsDescription } from "./types";

import { MIUMIU } from "./metadata";

export function log(type: symbol,description : any){

    
    
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {

        let config : ParamsDescription = Reflect.getMetadata(MIUMIU, target, propertyKey) || {};
        if(!config[parameterIndex]){
            config[parameterIndex] = {types: [], description: []};
        }
        config[parameterIndex].types.push(type);
        config[parameterIndex].description = {...config[parameterIndex].description, ...description};
        Reflect.defineMetadata(MIUMIU, config, target, propertyKey);
        
    }
}


export function cast(value: any, name: string, type: any) : any{
    if(value == undefined) return undefined;
    switch(type){
        case Number  : if(isNaN(value)) throw `${name} is not a number`; value = Number(value); break;
        case String  : break;
        case Boolean : value = (value == true || String(value).toLowerCase() == "true");
        case Object  : if(typeof value == "object") break; try{ value = JSON.parse(value); }catch(e){ throw `Can not convert ${name} to object`};
        default      : break;
    }
    return value;
}

export function GetMethodDecoraotor(method: symbol, path: string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const list = Reflect.getMetadata(method, target) || [];
        list.push({path, propertyKey});
        Reflect.defineMetadata(method, list, target);
    };
}