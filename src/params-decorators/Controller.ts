import { Router } from "express";
import { ParamsDescription, ParamsExcuteFunction} from "../types";
import {  MIUMIU, Methods, Decorators } from "../metadata";






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

                                

                                // Create params
                                const params = [];

                                const paramsType = Reflect.getMetadata('design:paramtypes', this, propertyKey);
                                const info : ParamsDescription= Reflect.getMetadata(MIUMIU, this, propertyKey);
                                
                            
                                
                                
                                for(let i=0; i < paramsType.length; i++){
                                    
                                    params.push(undefined);
                                    

                                    for(let type of info[i].types){

                                        try{
                                            const excuteFunction : ParamsExcuteFunction = Decorators[type];
                                            params[i] = await excuteFunction(params[i], info[i].description, paramsType[i], req, res);
                                        }catch(e){
                                            res.json({err: true, message: e});
                                            return;
                                        }
                                        
                                        
                                    };
                                   
                                    
                                }




                                // Excute    
                                try{
                                    const data = await this[propertyKey].apply(this, params);
                                    res.json({err: false, data});
                                }catch(e){
                                    res.json({err: true, message: e});
                                }                                    

                                if(process.env.NODE_ENV == 'development') console.log(`${controllerPath}${path} - ${method}`);
                                 
                            
                            });

                        }

                    }

                    this.router = router;
                    this.path   = controllerPath;
                
            }
        };


        Reflect.defineMetadata(MIUMIU, MIUMIU, rs);

        return rs;
    }
}