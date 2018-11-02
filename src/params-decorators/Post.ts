import { GetMethodDecoraotor } from "../functions";
import { Methods } from "../metadata";

export function Post(path: string){
    return GetMethodDecoraotor(Methods.post, path);
}
