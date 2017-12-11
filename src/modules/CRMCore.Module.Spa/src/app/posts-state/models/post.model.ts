export class Post {
    id:string;
    title: string;
    description: string;
    createdDate: Date;
    comments: string[];

    constructor(){
        this.title = ""
        this.description = ""
        this.comments = []       
    }
}

