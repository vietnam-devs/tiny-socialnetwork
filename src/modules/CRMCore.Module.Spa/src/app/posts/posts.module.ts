import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './services/post.service';

import { AddPostComponent, SearchPostComponent, PostEditComponent } from './components/post-list';
import { PostListComponent, PostDetailsComponent, PostsComponent } from './containers';

const components = [AddPostComponent,SearchPostComponent, PostEditComponent,
                   PostListComponent, PostDetailsComponent, PostsComponent]
@NgModule({
  declarations: [ components ],
  imports: [ PostsRoutingModule, SharedModule ],
  providers: [ PostService ]
})
export class PostsModule {}
