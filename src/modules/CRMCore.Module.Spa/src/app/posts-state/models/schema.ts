import { normalize, schema } from 'normalizr';

// Define a users schema
export const comment = new schema.Entity('comments');

export const postSchema = new schema.Entity('posts', { 
    comments: [ comment ]
  });