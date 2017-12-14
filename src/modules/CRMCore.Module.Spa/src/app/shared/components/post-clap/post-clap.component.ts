import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';

import { PostActionCreators } from '../../../posts-state/store/actions/post.action';
import * as fromPost from '../../../reducers';


@Component({
    selector: 'post-clap',
    templateUrl: './post-clap.component.html'
})
export class PostClapComponent  {
    @Input() NumberOfClaps: number;
    @Output() clapEvent = new EventEmitter();

    constructor() {

    }

    onClap() {
      this.clapEvent.emit();
    }
}

