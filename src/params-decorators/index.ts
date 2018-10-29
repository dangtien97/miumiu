import { excute as PathParam_excute,  key as PathParam_key  } from './PathParam'
import { excute as BodyParam_excute,  key as BodyParam_key  }   from './BodyParam'
import { excute as QueryParam_excute, key as QueryParam_key } from './QueryParam'
import { excute as Require_excute,    key as Require_key    } from './Require';




export const Decorators = {
    [PathParam_key] : PathParam_excute,
    [BodyParam_key] : BodyParam_excute,
    [QueryParam_key] : QueryParam_excute,
    [Require_key]    : Require_excute
}