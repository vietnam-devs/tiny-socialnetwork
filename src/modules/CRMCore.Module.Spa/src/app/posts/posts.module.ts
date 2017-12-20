// import modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';

// import services
import { PostService } from './services/post.service';

// import component
import {
  NewsFeedComponent,
  NewsFeedDetailsComponent,
  AddPostComponent,
} from './containers';

import {
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent, 
  PostItemComponent,
  SearchPostComponent,
  PostAddCommmentComponent,
  PostCommmentListComponent
} from './components';

const components = [
  AddPostComponent,  
  PostItemComponent,
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

  imports: [
    PostsRoutingModule, 
    SharedModule,    
  ],
  
  providers: [PostService]  

})
export class PostsModule {}
