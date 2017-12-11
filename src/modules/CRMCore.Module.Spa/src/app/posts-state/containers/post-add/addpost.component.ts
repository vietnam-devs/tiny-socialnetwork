import { Component , Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import * as fromPost from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PostActionCreators } from '../../store/actions/post.action';

@Component({
    selector: 'add-post',
    templateUrl: './addpost.component.html',
    styleUrls: ['./style.css']
})

export class AddPostComponent  implements OnInit {
  @Input() toggleAddPost;
  post: Post;
  postForm: FormGroup;

  constructor(private postService: PostService, private store: Store<fromPost.State>) {
    this.post = new Post();
  }

  ngOnInit() {
        this.postForm = new FormGroup({
            title: new FormControl(this.post.title, Validators.required),
            description: new FormControl(this.post.description, Validators.required)
        });
    }

  createPost() {    
      this.store.dispatch(PostActionCreators.addPost(this.post)); 
       this.store.dispatch(PostActionCreators.load());    
      this.reset();
  }

  reset() {
   this.postForm.reset();
  }
}
