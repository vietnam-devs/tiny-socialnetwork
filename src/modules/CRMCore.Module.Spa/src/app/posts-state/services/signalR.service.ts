import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Store } from '@ngrx/store';

import { ConfigService } from '../../core/services/config.service';
import { Clap, Post, Comment } from '../models';
import * as fromPost from '../store/reducers';
import { AddClapSuccess } from '../store/actions/clap.action';
import { PostActionCreators } from '../store/actions/post.action';
import { AddCommentSuccess } from '../store/actions/comment.action';

@Injectable()
export class SignalRService {
  private _hubConnection: HubConnection;

  constructor(private configService: ConfigService, private store: Store<fromPost.State>) {
    this._hubConnection = new HubConnection(
      `${configService.api_url}/postMessageHub`
    );

    this.registerOnServerEvents();

    this.startConnection();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch(err => {
        console.log('Error while establishing connection');
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('AddClapSuccess', (data: Clap) => {
      this.store.dispatch(new AddClapSuccess(data));
    });

    this._hubConnection.on('AddPostSuccess', (data: Post) => {
      this.store.dispatch(PostActionCreators.addPostSucess(data));
    });

    this._hubConnection.on('AddCommentSuccess', (data: Comment) => {
      this.store.dispatch(new AddCommentSuccess(data));
    });

    this._hubConnection.on('DeletePostSuccess', (data: string) => {
      this.store.dispatch(PostActionCreators.removePostSuccess(data));
    });
  }
}
