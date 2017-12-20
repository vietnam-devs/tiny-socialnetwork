import { Component, Input, OnInit } from '@angular/core';
// rxjs
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

// import services
import { PostService } from '../services/post.service';

// import model
import { Post } from '../models/post.model';
import { PaginatedItem } from '../../shared/models/paginateditem.model';



@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./style.css']
})
export class NewsFeedComponent implements OnInit {

  posts: Post[] = [];
  searchTerm: string;
  page: number;
  toggleAddPost: boolean;

  constructor(
    private postService: PostService
  ) {
    this.page = 0;   
  }

  ngOnInit(): void {   
    this.loadPosts();
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  postCreatedListenEvent(post: Post) {       
     this.posts.unshift(post);    
  };

  deletePostListenEvent(post: Post) { 
   this.posts.splice(this.posts.indexOf(post), 1);
  };

  loadPosts(): void {    
    this.page += 1;
    this.postService
      .getPosts(this.page)
      .subscribe((result: PaginatedItem<Post>) => {
        if (result.items.length > 0) {
          this.posts.push(...result.items);        
        }
      });
  }

  onScrollDown() {
    this.loadPosts();
  }

  handleToggleAddPost(){
    this.toggleAddPost = !this.toggleAddPost;
  }
}
