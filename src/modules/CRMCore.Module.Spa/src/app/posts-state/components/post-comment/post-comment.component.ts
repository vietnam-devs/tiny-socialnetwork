import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../../models';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommmentItemComponent implements OnInit {
  @Input() comment: Comment;

  ngOnInit(): void {
  }

  constructor() {}
}
