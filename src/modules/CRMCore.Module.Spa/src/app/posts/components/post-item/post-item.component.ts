import {Component, Input, Output, EventEmitter} from '@angular/core';

import { PostService } from '../../services/post.service';
import { SharedService } from '../../../shared/services/sharedService';
import { Post } from '../../models/post.model';

@Component({
    selector: 'post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./style.css']
})

export class PostItemComponent {
   @Input() post: Post;
   @Input() searchTerm: string;  
   @Output() postDeletedEvent = new EventEmitter();

   constructor(private postService: PostService ) {} 

   deletePost(post: Post) {      
    this.postService.deletePost(post.id).subscribe(res => {     
      this.postDeletedEvent.emit(post)
    });
  }
}
