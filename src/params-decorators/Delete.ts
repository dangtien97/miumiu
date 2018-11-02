import { GetMethodDecoraotor } from "../functions";
import { Methods } from "../metadata";

export function Delete(path: string){
    return GetMethodDecoraotor(Methods.delete, path);
}
