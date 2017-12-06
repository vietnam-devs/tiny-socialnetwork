import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/delay';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { debug } from 'util';
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

  constructor(private postService: PostService) {
    this.page = 0;
  }

  ngOnInit(): void {
   this.loadPosts();
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  loadPosts(): void{
    this.page += 1;
    this.postService.getPosts(this.page)
      .subscribe((result:PaginatedItem<Post>) => {
      if(result.items.length > 0){
        this.posts.push(...result.items);
      }
    });
  }

  onScrollDown() {
    this.loadPosts();
  }
}
