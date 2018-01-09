import { normalize, schema } from 'normalizr';

// Define a users schema
export const commentSchema = new schema.Entity('comments');

export const clapSchema = new schema.Entity('claps');

export const postSchema = new schema.Entity('posts', { 
    comments: [ commentSchema ],
    claps: [clapSchema]
  });