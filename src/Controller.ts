import { Router } from "express";
import { Methods, FAPI, ParamsExcuteFunction, ParamsDescription,  paramsInfo, excuteFunction} from "./types";
import { Decorators } from "./params-decorators";

export function Controller<T extends {new(...args:any[])}>(controllerPath: string) {

    return ( C : T) => {
        
        const rs =  class extends C{

            public readonly path : string;
            public readonly router;

            constructor(...args: any[]){
                super(...args);

                
                const router = Router();

                for(let method in Methods){

                    const list  = Reflect.getMetadata(Methods[method], this) || [];
                    if(list.length == 0) continue;

                    

                    
                    
                    for(let {path, propertyKey} of list){


                        
                        
                        router[method](path[0] == '/'?path:'/'+path, async(req, res) => {

                            console.log(req.ControllerParams);

                            // Create params
                            const params = [];

                            const paramsType = Reflect.getMetadata('design:paramtypes', this, propertyKey);
                            

                            
                            for(let i=0; i < paramsType.length; i++){
                                
                                let value = undefined;

                                // Get data source
                                const info : ParamsDescription= Reflect.getMetadata(paramsInfo, this, propertyKey);

                                
                                

                                for(let type of info.types){
                                    try{
                                        const excuteFunction : ParamsExcuteFunction = Decorators[type];
                                        value = await excuteFunction(value, info.description, paramsType[i], req, res);
                                    }catch(e){
                                        console.log(e);
                                        res.json({err: true, message: e});
                                        return;
                                    }

                                    
                                };
                                

                                params.push(value);

                            }
                            


                            // Excute    
                                try{
                                    const data = await this[propertyKey].apply(this, params);
                                    res.json({err: false, data});
                                }catch(e){
                                    res.json({err: true, message: e});
                                }
                            });

                        console.log(`${controllerPath}${path} - ${method}`);

                    };

                }

                this.router = router;
                this.path   = controllerPath;
                
            }
        }
        
        Reflect.defineMetadata(FAPI, FAPI, rs);

        return rs;
    }
}