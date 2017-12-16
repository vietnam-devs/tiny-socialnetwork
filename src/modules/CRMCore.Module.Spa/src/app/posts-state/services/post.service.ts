import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Post, Comment, AddClapRequest, Clap } from '../models';
import { ConfigService } from '../../core/services/config.service';
import { PaginatedItem } from '../../shared-state/models/paginateditem.model';

@Injectable()
export class PostService {
  posts: Post[] = [];
  postUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.postUrl = `${configService.api_url}/api/post`;
  }

  getPosts(page: number): Observable<PaginatedItem<Post>> {
    return this.http
      .get<PaginatedItem<Post>>(`${this.postUrl}?Page=${page}`)
      .map(res => {
        return res;
      });
  }

  editPost(post: Post): Observable<Post> {
    let editUrl = `${this.postUrl}/${post.id}`;
    return this.http.put<Post>(editUrl, post);
  }

  deletePost(id: string): Observable<string> {
    let deleteUrl = `${this.postUrl}/${id}`;
    return this.http.delete<string>(deleteUrl);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.postUrl}`, post);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.postUrl}/${comment.postId}/comment`, comment);
  }

  addClap(clap: AddClapRequest): Observable<Clap> {
    return this.http.post<Clap>(`${this.postUrl}/clap`, clap);
  }
}
