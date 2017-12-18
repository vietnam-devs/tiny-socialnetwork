import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedComponent, NewsFeedDetailsComponent} from './containers';
import {PostGuard} from './guards/post.guard';

const routes: Routes = [ 
  { path: '', component: NewsFeedComponent},
  { path: ':id', component: NewsFeedDetailsComponent, canActivate:[PostGuard] },
];

@NgModule({  
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PostsRoutingModule {}

