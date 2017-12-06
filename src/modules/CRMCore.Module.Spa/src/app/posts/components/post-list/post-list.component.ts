import {Component, Input} from '@angular/core';

import { PostService } from '../../services/post.service';
import { SharedService } from '../../../shared/services/sharedService';
import { Post } from '../../models/post.model';

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./style.css']
})

export class PostListComponent {
    @Input() posts;
    @Input() searchTerm: string;
    toggleAddPost: boolean = false;
    editPosts: Post[] = [];

    constructor(private postService: PostService,private sharedService: SharedService ) {}
   
   editPost(post: Post) {
      if (this.posts.includes(post)) {
        if (!this.editPosts.includes(post)) {
          this.editPosts.push(post);
        }else {
          this.editPosts.splice(this.editPosts.indexOf(post), 1);
          this.postService.editPost(post).subscribe(res => {
            // TODO
            console.log('Update Succesful');
          }, err => {
            console.error('Update Unsuccesful');
          });
        }
      }
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).subscribe(res => {
      this.posts.splice(this.posts.indexOf(post), 1);
    });
  }

  postCreatedListen(post: Post) {   
     this.posts.push(post);
     this.sharedService.publishData(true);
  }

  onScroll() {
    console.log('scrolled!!');
  }
}
