import { NgModule,  } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FilterPipe } from './pipe';
import { CommonModule  } from '@angular/common';
import { TruncateModule } from 'ng2-truncate';
import { SharedService } from './services/sharedService';
import { ClapComponent } from './components/clap/clap.component';

@NgModule({
    declarations: [     
      FilterPipe ,
      ClapComponent  
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
      ClapComponent  ,
      ReactiveFormsModule,      
      FormsModule,
      CommonModule,
      TruncateModule,
      InfiniteScrollModule,
      FilterPipe       
    ]
})

export class SharedModule { }

