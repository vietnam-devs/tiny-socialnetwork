import * as fromPost from './post.reducer';
import * as fromComment from './comment.reducer';
import * as fromClap from './clap.reducer';

export * from './post.selector';

export const reducers = {
    posts: fromPost.reducer,
    comments: fromComment.reducer,
    claps: fromClap.reducer,
  };



