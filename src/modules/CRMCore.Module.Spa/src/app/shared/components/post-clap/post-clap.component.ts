import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';

import { PostActionCreators } from '../../../posts-state/store/actions/post.action';
import * as fromPost from '../../../reducers';

@Component({  
    selector: 'post-clap',
    templateUrl: './post-clap.component.html'
})
export class PostClapComponent  {   
    @Input() NumberOfClaps: number;
    @Input() EntityId: string;
    @Input() ClapType: string;

    constructor( private store: Store<fromPost.State>){

    }
    clap(){
        this.store.dispatch(PostActionCreators.addClap({
            entityId: this.EntityId,
            entityType: this.ClapType
        }));
    }
}

