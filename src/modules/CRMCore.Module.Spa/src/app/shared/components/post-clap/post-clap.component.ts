import {Component, Input} from '@angular/core';
@Component({  
    selector: 'post-clap',
    templateUrl: './post-clap.component.html'
})
export class PostClapComponent  {   
    @Input() NumberOfClaps: number;
}

