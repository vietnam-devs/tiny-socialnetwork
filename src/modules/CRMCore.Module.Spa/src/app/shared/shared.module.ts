import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from './pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [     
      FilterPipe
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,    
      CommonModule  
    ],
    exports: [
      ReactiveFormsModule,      
      FormsModule,
      CommonModule,
      FilterPipe
    ]
})

export class SharedModule { }

