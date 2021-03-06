import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import { MIUMIU } from '../metadata';





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
        
        const index = process.argv[1];
        const basename = path.basename(index);

        const pwd = path.relative('/', basename.match(/\.ts$/) ? path.dirname(index):index);
        
        const controllers : string[] = await new Promise<string[]>(s => {
            fs.readdir(`/${pwd}/controllers`, (err, list) => {
                if(err){
                    console.error(err);  s([]);    return;
                }
                
                s(list.filter( f => f.split('.').pop() == 'ts'));
            })
        });

        
        
        

        controllers.map( file => {
            const controller = require(`/${pwd}/controllers/${file}`);
            for(let key in controller){
                if(Reflect.getMetadata(MIUMIU, controller[key]) != MIUMIU ) continue;

                
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