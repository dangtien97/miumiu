import { GetMethodDecoraotor } from "../functions";
import { Methods } from "../metadata";

export function Put(path: string){
    return GetMethodDecoraotor(Methods.put, path);
}
