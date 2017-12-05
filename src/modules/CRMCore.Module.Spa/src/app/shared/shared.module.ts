import { NgModule,  } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FilterPipe } from './pipe';
import { CommonModule  } from '@angular/common';
import { SharedService } from './services/sharedService';
@NgModule({
    declarations: [     
      FilterPipe      
    ],
    imports: [
      FormsModule,
      InfiniteScrollModule,
      ReactiveFormsModule,    
      CommonModule  
    ],
    providers:[
      SharedService
    ],
    exports: [
      ReactiveFormsModule,      
      FormsModule,
      CommonModule,
      FilterPipe      
    ]
})

export class SharedModule { }

