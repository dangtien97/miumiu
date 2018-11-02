
import { excute as PathParam_excute   ,  key as PathParam_key      } from './params-decorators/PathParam'
import { excute as BodyParam_excute   ,  key as BodyParam_key      } from './params-decorators/BodyParam'
import { excute as QueryParam_excute  ,  key as QueryParam_key     } from './params-decorators/QueryParam'
import { excute as Require_excute     ,  key as Require_key        } from './params-decorators/Require';
import { excute as HeaderParam_excute ,  key as HeaderParam_key    } from './params-decorators/HeaderParam';

// Lib indentifer
export const MIUMIU = Symbol.for('MIUMIU');


// Http method
export const Methods = {
    get    : Symbol.for('GET'),
    post   : Symbol.for('POST'),
    put    : Symbol.for('PUT'),
    delete : Symbol.for('DELETE'),
};

export const Decorators = {
    [PathParam_key]   : PathParam_excute,
    [BodyParam_key]   : BodyParam_excute,
    [QueryParam_key]  : QueryParam_excute,
    [Require_key]     : Require_excute,
    [HeaderParam_key] : HeaderParam_excute
}
