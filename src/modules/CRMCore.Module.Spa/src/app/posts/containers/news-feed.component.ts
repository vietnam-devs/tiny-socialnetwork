import { Component, Input, OnInit } from '@angular/core';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { debug } from 'util';

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
    this.page += 1;
    this.postService.getPosts(this.page).subscribe(result => {
      this.posts = result.items;
    });
  }

  listenSearchEvent(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  onScrollDown(ev) {
    console.log('scrolled!!')
    //console.log(ev);
  }
}
