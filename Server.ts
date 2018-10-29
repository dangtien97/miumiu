import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import { FAPI } from './types';





interface options{
    port : number
}

export class Server{
    private app;

    constructor( private opts: options){
        this.app = express();
    }

    private async mountMiddlewares(){
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
    }

    private async mountRoutes(){


        

        const pwd = '/home/ba/Bin/livestream-viewer-api/src/micro-services/web-server/';//path.dirname(`${process.cwd()}/${process.argv[1]}`);
        
        const controllers : string[] = await new Promise<string[]>(s => {
            fs.readdir(`${pwd}/controllers`, (err, list) => {
                if(err){
                    console.error(err);  s([]);    return;
                }
                s(list.filter( f => f.split('.').pop() == 'ts'));
            })
        });
        
        

        controllers.map( file => {
            const controller = require(`${pwd}/controllers/${file}`);
            for(let key in controller){
                if(Reflect.getMetadata(FAPI, controller[key]) != FAPI ) continue;
             
                const {path, router} = new controller[key]();
                this.app.use(path[0] == '/'?path:'/'+path, (req, res, next) => {
                    req.ControllerParams = req.params;
                    next();
                }, router);
                
            }
            
        });

        this.app.use('*', (req, res) => res.json({err: true, message: "API endpoint not found"}));

    }


    public async start(){
       await this.mountMiddlewares();
       await this.mountRoutes();
     

       this.app.listen(this.opts.port,() => console.log(`Example app listening on port ${this.opts.port}!`))


       

    }
}