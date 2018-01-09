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
  @Output() clapEvent = new EventEmitter();

  constructor() {}

  onDeletePost(postId: string) {
    this.onDeletePostEvent.emit(postId);
  }

  onClap(postId: string) {
    this.clapEvent.emit(postId);
  }
}
