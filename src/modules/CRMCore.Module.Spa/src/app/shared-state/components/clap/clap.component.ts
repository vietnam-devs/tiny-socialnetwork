import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';

import { PostActionCreators } from '../../../posts-state/store/actions/post.action';
import * as fromPost from '../../../reducers';


@Component({
    selector: 'clap',
    templateUrl: './clap.component.html'
})
export class ClapComponent  {
    @Input() NumberOfClaps: number;
    @Output() clapEvent = new EventEmitter();

    constructor() {

    }

    onClap() {
      this.clapEvent.emit();
    }
}

