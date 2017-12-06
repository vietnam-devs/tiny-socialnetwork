import { Component ,Output , EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/services/sharedService';

@Component({
    selector: 'search-post',
    templateUrl: './searchpost.component.html'    
})
export class SearchPostComponent {
    @Output() searchEvent = new EventEmitter();
    searchTerm: string;

    constructor(private sharedService: SharedService)
    {     
        this.sharedService.postsChanged.subscribe(
            data => {                
               if(data && this.searchTerm){
                  this.search();
               }
            });
    }

    search(){
         this.searchEvent.emit(this.searchTerm);
    }


}
