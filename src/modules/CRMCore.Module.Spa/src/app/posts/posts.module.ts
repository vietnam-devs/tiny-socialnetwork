import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './services/post.service';

import {NewsFeedComponent, NewsFeedDetailsComponent} from './containers';


import {
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent,
  AddPostComponent,
  PostListComponent,
  SearchPostComponent,
  PostAddCommmentComponent,
  PostCommmentListComponent
} from './components';

const components = [
  AddPostComponent,
  AddPostComponent,
  PostListComponent,
  NewsFeedComponent,
  NewsFeedDetailsComponent,
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent,
  SearchPostComponent,
  PostAddCommmentComponent,
  PostCommmentListComponent  
];
@NgModule({
  declarations: [components],

  imports: [PostsRoutingModule, SharedModule],
  providers: [PostService]  

})
export class PostsModule {}
