import { NgModule,  } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FilterPipe } from './pipe';
import { CommonModule  } from '@angular/common';
import { TruncateModule } from 'ng2-truncate';
import { SharedService } from './services/sharedService';
import { PostClapComponent } from './components/post-clap/post-clap.component';

@NgModule({
    declarations: [     
      FilterPipe ,
      PostClapComponent  
    ],
    imports: [
      FormsModule,
      InfiniteScrollModule,
      ReactiveFormsModule,    
      CommonModule  ,
      TruncateModule
    ],
    providers:[
      SharedService
    ],
    exports: [
      PostClapComponent  ,
      ReactiveFormsModule,      
      FormsModule,
      CommonModule,
      TruncateModule,
      InfiniteScrollModule,
      FilterPipe       
    ]
})

export class SharedModule { }

