export class Post {
    id: string;
    title: string;
    description: string;
    createdDate: Date;
    comments: string[];
    ownerName: string;
    claps: string[];

    constructor() {
        this.title = '';
        this.description = '';
        this.comments = [];
    }
}

