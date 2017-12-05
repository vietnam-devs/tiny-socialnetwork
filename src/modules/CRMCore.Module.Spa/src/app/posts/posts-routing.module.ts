import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedComponent, PostDetailsComponent, PostsComponent} from './containers';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      { path: '',  component: NewsFeedComponent },
      { path: ':id', component: PostDetailsComponent },
    ]
  }
];

@NgModule({  
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PostsRoutingModule {}
