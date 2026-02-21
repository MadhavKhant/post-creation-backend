import {v4 as uuid} from 'uuid';

export function createPost({ userId, content}) {
    return {
        id: uuid(),          // Unique ID
        userId,              
        content,             
        createdAt: Date.now(),

        likes: [],           
        comments: [],        
        shares: 0            
    };
}

export function createComment({ userId, text }) {
    return {
        id: uuid(),
        userId,
        text,
        createdAt: Date.now()
    };
}


