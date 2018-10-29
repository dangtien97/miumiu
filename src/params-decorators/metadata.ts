import { ParamsDescription, paramsInfo } from "../types";





export function log (
    type              : symbol,
    description       : any,
    
){
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {

        let config : ParamsDescription = Reflect.getMetadata(paramsInfo, target, propertyKey) || {types: [], description: {}};
        config.types.push(type);
        config.description = {...config.description, ...description};
        Reflect.defineMetadata(paramsInfo, config, target, propertyKey);


    }
}

