import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter,take, switchMap,catchError,map } from 'rxjs/operators';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';
import { Post}  from '../models/post.model';

@Injectable()
export class PostGuard implements CanActivate{
    constructor(private store: Store<fromReducer.PostState>){}

    canActivate(route: ActivatedRouteSnapshot){      
        return this.checkStore().pipe(
            switchMap(() => {
                const id = route.params["id"];
                return this.hasPost(id);
            })
        );        
    }
    hasPost(id:string): Observable<boolean>{
        return this.store.select( fromReducer.getPostEntities).pipe(
            map((entities: {[id:string]: Post}) => !!entities[id])
        )
    }
    checkStore() : Observable<boolean>{
            return this.store.select( fromReducer.getPostLoaded).pipe(
                tap(loaded => {
                    if(!loaded){
                        this.store.dispatch(new fromAction.Load)
                    }
                }),
               filter(loaded => loaded)
            );
    }
}