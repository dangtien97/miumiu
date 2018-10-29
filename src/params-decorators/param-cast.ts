export function cast(value: any, name: string, type: any) : any{
    if(value == undefined) return undefined;
    switch(type){
        case Number  : if(isNaN(value)) throw `${name} is not a number`; value = Number(value); break;
        case String  : break;
        case Boolean : value = (value == true || String(value).toLowerCase() == "true");
        case Object  : if(typeof value == "object") break; try{ value = JSON.parse(value); }catch(e){ throw `Can not convert ${name} to object`};
        default      : break;
    }
    return value;
}