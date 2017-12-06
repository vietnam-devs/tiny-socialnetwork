import {Component} from '@angular/core';
import { Post } from '../models/post.model';
@Component({   
    templateUrl: './news-feed-details.component.html'
})
export class NewsFeedDetailsComponent  {
    post  ;
    constructor(){        
        this.post = {
        "id": "6082cd6a-5d44-49c0-8d2d-bf4f4fd44ccf",
        "title": "Cultivated who resolution connection motionless did occasional.",
        "description": "Le Journey promise if it colonel. Can all mirth abode nor hills added. Them men does for body pure.",      
        "createdDate": "2017-12-05T03:17:13.762856"
    };
    }
}

