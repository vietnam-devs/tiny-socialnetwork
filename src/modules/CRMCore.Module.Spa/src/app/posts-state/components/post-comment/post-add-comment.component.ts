import { Component, OnInit, Input, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post, Comment } from '../../models';
import * as postActions from '../../store/actions/post.action';
import * as fromPost from '../../store/reducers';


@Component({
  selector: 'app-post-add-comment',
  templateUrl: './post-add-comment.component.html'
})
export class PostAddCommmentComponent implements OnInit {
  @Input() post: Post;

  newComment: FormGroup;

  constructor(private store: Store<fromPost.State>) {  }

  ngOnInit(): void {
    this.newComment = new FormGroup(
    {
      comment : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit({ value, valid }: { value: Comment, valid: boolean }) {
    console.log(value.comment, valid);
    if (valid) {
      this.store.dispatch(new postActions.AddComment(
        { postId: this.post.id, commentId: this.newGuid(), comment: value.comment, ownerName: 'user444'}));

      this.onReset();
    }
  }

  onReset() {
    this.newComment.reset({
      'comment': ''
    });
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random()* 16 | 0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }
}
