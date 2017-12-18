import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared-state/shared.module';
import { PostService } from './services/post.service';
import { SignalRService } from './services/signalR.service';

import { NewsFeedComponent, NewsFeedDetailsComponent, AddPostComponent } from './containers';
import { reducers } from './store/reducers';
import { PostEffects } from './store/effects/posts.effect';

import {PostGuard} from './guards/post.guard';

import {
  PostProfileComponent,
  PostNewsFeedMenuComponent,
  PostChatOnlineComponent,
  PostFollowUserComponent,
  PostItemComponent,
  SearchPostComponent,
  PostCommmentItemComponent,
  PostAddCommmentComponent
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
  PostCommmentItemComponent,
  PostAddCommmentComponent,
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
  providers: [PostService, SignalRService,PostGuard]
})
export class PostsModule {}
