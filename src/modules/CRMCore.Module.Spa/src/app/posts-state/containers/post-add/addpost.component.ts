import { Component , Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromAction from '../../store/actions';
import * as fromReducer from '../../store/reducers';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'add-post',
    templateUrl: './addpost.component.html',
    styleUrls: ['./style.css']
})

export class AddPostComponent  implements OnInit {
  @Input() toggleAddPost;
  post: Post;
  postForm: FormGroup;

  constructor(private postService: PostService, private store: Store<fromReducer.State>) {
    this.post = new Post();
  }
 
  ngOnInit() {
        this.postForm = new FormGroup({
            title: new FormControl(this.post.title, Validators.required),
            description: new FormControl(this.post.description, Validators.required)
        });
    }

  createPost() {    
      var  newPost = {...new Post(), ...this.post};
      this.store.dispatch( new fromAction.AddPost(newPost)); 
      this.reset();
  }

  reset() {
   this.postForm.reset();
  }
}
