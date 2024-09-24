import { create } from 'zustand';
import axios from 'axios';

// User interface
interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string;
  bio?: string;
  location?: string;
  certifications?: string[];
  dive_hours?: number;
  friends?: string[];
  posts?: string[];
  karma?: number;
  badges?: string[];
  banner_image?: string;
}

// Zustand state interface for User store
interface UserState {
  users: User[];
  signup: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, updateData: Partial<User>) => Promise<void>;
  fetchUsers: () => Promise<void>; // Fetch all users from the backend
  fetchUser: (id: string) => Promise<void>; // Fetch a single user by ID
  setUsers: (users: User[]) => void;
  getUsers: () => User[];
  getOneUser: (id: string) => User | undefined; 
}

// Zustand user store
const useUserStore = create<UserState>()((set, get) => ({
  users: [],

  // Fetch all users from the backend
  fetchUsers: async () => {
    try {
      const response = await axios.get('/api/users');
      set({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  // Fetch a single user by ID from the backend
  fetchUser: async (id: string) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      const user = response.data;
      set((state) => ({
        users: state.users.map((u) =>
          u.id === id ? user : u
        ),
      }));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },

  // Create a new user in the backend
  signup: async (user: User) => {
    try {
      const response = await axios.post('/api/users', user);
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error('Error creating user:', error);
    }
  },

  // Update a user by ID in the backend
  updateUser: async (id: string, updateData: Partial<User>) => {
    try {
      const response = await axios.put(`/api/users/${id}`, updateData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? response.data : user
        ),
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },

  // Delete a user by ID from the backend
  deleteUser: async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },

  // Set multiple users (e.g., after fetching from a server)
  setUsers: (users: User[]) => set(() => ({ users })),

  // Get all users
  getUsers: () => get().users,

  // Get a single user by ID
  getOneUser: (id: string) => get().users.find((user) => user.id === id),
}));

export default useUserStore;
