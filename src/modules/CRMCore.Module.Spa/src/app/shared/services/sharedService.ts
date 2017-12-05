import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {   
  postsChanged = new Subject<boolean>();    
   
  publishData(data: boolean) {
    this.postsChanged.next(data);
  }
   
}