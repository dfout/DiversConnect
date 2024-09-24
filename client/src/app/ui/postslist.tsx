'use client';

import React, { useEffect } from 'react';
import usePostsStore from '../stores/posts-store'; // Adjust the path as necessary
import { useStore } from 'zustand';

const PostsList: React.FC = () => {
  const store = useStore(usePostsStore);
  console.log(store);
  const { fetchPosts, getPosts } = store;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const posts = getPosts();

  return (
    <div>
      <h1>Posts List</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              {/* <p>}</p> */}
              <p>Author: {post.author.username}</p>
              <p>Created at: {new Date(post.posted_at).toLocaleDateString()}</p>
              {/* <p>Updated at: {new Date(post.updated_at).toLocaleDateString()}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostsList;
