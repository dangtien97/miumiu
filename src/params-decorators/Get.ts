import { GetMethodDecoraotor } from "../functions";
import { Methods } from "../metadata";

export function Get(path: string){
    return GetMethodDecoraotor(Methods.get, path);
}
