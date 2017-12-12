import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../../models/post.model';

@Component({
  selector: 'post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./style.css']
})
export class PostItemComponent {
  @Input() detailMode: boolean;
  @Input() post: Post;
  @Output() onDeletePostEvent = new EventEmitter();

  constructor() {}

  deletePost(postId: string){
    this.onDeletePostEvent.emit(postId);
  }
}
