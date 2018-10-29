import "reflect-metadata";  
import { Methods } from "./types";



export function Get(path: string){
    return GetMethodDecoraotor(Methods.get, path);
}

export function Post(path: string){
    return GetMethodDecoraotor(Methods.post, path);
}

export function Put(path: string){
    return GetMethodDecoraotor(Methods.put, path);
}

export function Delete(path: string){
    return GetMethodDecoraotor(Methods.delete, path);
}

function GetMethodDecoraotor(method: symbol, path: string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const list = Reflect.getMetadata(method, target) || [];
        list.push({path, propertyKey});
        Reflect.defineMetadata(method, list, target);
    };
}