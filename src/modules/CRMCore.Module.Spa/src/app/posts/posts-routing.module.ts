import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedComponent, NewsFeedDetailsComponent} from './containers';

const routes: Routes = [ 
  { path: '', component: NewsFeedComponent},
  { path: ':id', component: NewsFeedDetailsComponent },
];

@NgModule({  
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PostsRoutingModule {}

