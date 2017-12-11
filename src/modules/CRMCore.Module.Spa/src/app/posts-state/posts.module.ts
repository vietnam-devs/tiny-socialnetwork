import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './services/post.service';

import { NewsFeedComponent, NewsFeedDetailsComponent, AddPostComponent } from './containers';
import { reducers } from './store/reducers';
import { PostEffects } from './store/effects/posts.effect';
import {
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent,
  PostItemComponent,
  SearchPostComponent,
 // PostCommmentItemComponent,
  //PostCommmentListComponent,
  //PostDetailsComponent
} from './components';

const components = [
  AddPostComponent,
  AddPostComponent,
  PostItemComponent,
  NewsFeedComponent,
  NewsFeedDetailsComponent,
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent,
  SearchPostComponent,
 // PostCommmentItemComponent,
  //PostCommmentListComponent,
  //PostDetailsComponent
];
@NgModule({
  declarations: [components],

  imports: [
    PostsRoutingModule,
    SharedModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('PostFeature', reducers),
    EffectsModule.forFeature([PostEffects])
  ],
  providers: [PostService]
})
export class PostsModule {}
