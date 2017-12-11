import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../../models/post.model';

@Component({
  selector: 'post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./style.css']
})
export class PostItemComponent {
  @Input() post: Post;
  @Output() onDeletePostEvent = new EventEmitter();

  constructor() {}

  deletePost(postId: string){
    console.log(postId);
    this.onDeletePostEvent.emit(postId);
  }
}
