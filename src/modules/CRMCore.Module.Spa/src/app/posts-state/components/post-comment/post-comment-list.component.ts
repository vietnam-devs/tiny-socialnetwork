import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../../models';

@Component({
  selector: 'app-post-comment-list',
  templateUrl: './post-comment-list.component.html'
})
export class PostCommmentListComponent implements OnInit {
  @Input() comments: Comment[];

  ngOnInit(): void {
  }

  constructor() {}
}
