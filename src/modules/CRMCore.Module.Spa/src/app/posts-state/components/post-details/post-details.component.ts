import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromPost from '../../store/reducers';
import { Post, Comment } from '../../models';

@Component({
  selector: 'app-post-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-post-item [post]="post$ | async"></app-post-item>
    <app-post-add-comment [post]="post$ | async"></app-post-add-comment>
    <app-post-comment-list [comments]="comments$ | async"> </app-post-comment-list>
  `
})
export class PostDetailsComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;

  constructor(private store: Store<fromPost.State>) {
    this.post$ = store.select(fromPost.getSelectedPost);
    this.comments$ = store.select(fromPost.getPostComments);
  }

  ngOnInit() {}
}
