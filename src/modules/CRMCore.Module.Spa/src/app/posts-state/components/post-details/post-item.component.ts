import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  template: `
  <div class="post-detail">
  <div class="user-info">
    <img alt="" class="profile-photo-sm pull-left" src="http://placehold.it/300x300">
    <div>
      <h5>
        <a href="#" class="profile-link">Alexis Clark</a>
      </h5>
      <p class="text-muted">Posted on {{ post.createdDate | date:'short':'GMT-7' }}</p>
    </div>
  </div>
  <div class="post-text">
    <p class="link-detail-accent">{{ post.title }}</p>
    <p>{{ post.description }}</p>
  </div>
</div>
`
})

export class PostItemComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit() { }
}
