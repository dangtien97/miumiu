
### Fast API server with NodeJS and Typescirpt

### Struct project
```
--- index.ts
--- controllers
    |------ A.controller.ts
```

### Require
Install typescirpt and setup carefull for decorator
You shoud install ts-node-dev for development


### Create controller
```typescript
import { Controller, Get, PathParam, Post } from "miumiu";

@Controller("/hello")
export class AController {

    @Get('/')
    public async get_live(
     
    ){
        return {"OK"};
    }
    
    @Post('/')
    public async get_die(
       @Require()  @BodyParam('abc') cookies : string[]
    ){
        return {cookies};

    }
}
```

### Create server
```typescript
import { Server } from "miumiu";

new Server({port: 8080}).start();
```

### Start
#### Intall ts-node-dev for development
```bash
ts-node-dev index.ts
```