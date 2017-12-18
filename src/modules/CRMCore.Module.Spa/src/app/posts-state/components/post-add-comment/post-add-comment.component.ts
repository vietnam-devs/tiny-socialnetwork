import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post, Comment } from '../../models';
import * as postActions from '../../store/actions/post.action';
import * as fromPost from '../../store/reducers';


@Component({
  selector: 'post-add-comment',
  templateUrl: './post-add-comment.component.html'
})
export class PostAddCommmentComponent implements OnInit {
  @Input() post: Post;
  @Output() addComment = new EventEmitter<Comment>();

  newComment: FormGroup;

  constructor(private store: Store<fromPost.State>) {  }

  ngOnInit(): void {
    this.newComment = new FormGroup(
    {
      comment : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit({ value, valid }: { value: Comment, valid: boolean }) { 
    if (valid) {
      value.postId = this.post.id;
      this.addComment.emit(value);
      this.onReset();
    }
  }

  onReset() {
    this.newComment.reset({
      'comment': ''
    });
  }
}
