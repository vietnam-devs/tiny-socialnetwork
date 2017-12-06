import {Component, Input, OnInit} from '@angular/core';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
    selector: 'news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./style.css']
})

export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];
  searchTerm: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(result => { this.posts = result; });
  }
  
  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
}
