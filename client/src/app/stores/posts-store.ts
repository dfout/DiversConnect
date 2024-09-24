import { create } from 'zustand';
import axios from 'axios';

// Post interface (simplified from Mongoose schema)
interface Post {
  id: string;
  author: Author;
  images?: string[];
  comments?: {
    author: string;
    text: string;
    created_at: Date;
  }[];
  likes?: string[];
  posted_at: Date;
  updated_at?: Date;
  location?: string;
  dive?: string;
}

interface Author {
  id: string,
  username: string,
  email: string
}

// Zustand state interface for Post store
interface PostState {
  posts: Post[];
  createPost: (post: Post) => Promise<void>;
  updatePost: (id: string, updateData: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  fetchPosts: () => Promise<void>; // Fetch all posts from the backend
  fetchPost: (id: string) => Promise<void>; // Fetch a single post by ID
  getPosts: () => Post[];
  getOnePost: (id: string) => Post | undefined;
  getUserPosts: (userId: string) => Post[];
}

// Zustand post store
const usePostStore = create<PostState>()((set, get) => ({
  posts: [],

  // Fetch all posts from the backend
  fetchPosts: async () => {
    try {
      const response = await axios.get('/api/posts');
      set({ posts: response.data });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },

  // Fetch a single post by ID from the backend
  fetchPost: async (id: string) => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      const post = response.data;
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === id ? post : p
        ),
      }));
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  },

  // Create a new post in the backend
  createPost: async (post: Post) => {
    try {
      const response = await axios.post('/api/posts', post);
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (error) {
      console.error('Error creating post:', error);
    }
  },

  // Update a post by ID in the backend
  updatePost: async (id: string, updateData: Partial<Post>) => {
    try {
      const response = await axios.put(`/api/posts/${id}`, updateData);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? response.data : post
        ),
      }));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },

  // Delete a post by ID from the backend
  deletePost: async (id: string) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },

  // Get all posts
  getPosts: () => get().posts,

  // Get a single post by ID
  getOnePost: (id: string) => get().posts.find((post) => post.id === id),

  // Get all posts authored by a specific user
  getUserPosts: (id: string) =>
    get().posts.filter((post) => post.author.id === id),
}));

export default usePostStore;
