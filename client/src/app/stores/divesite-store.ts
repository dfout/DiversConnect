import { create } from 'zustand';
import axios from 'axios';

interface DiveSite {
  id: string;
  name: string;
  location: {
    country: string;
    region?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  depth_range: {
    min_depth: number;
    max_depth: number;
  };
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  marine_life?: string[];
  safety_rating?: number;
  dive_conditions: {
    visibility: string;
    current: string;
  };
  created_at: Date;
  updated_at: Date;
}

interface DiveSiteState {
  diveSites: DiveSite[];
  addDiveSite: (diveSite: DiveSite) => void;
  updateDiveSite: (id: string, updateData: Partial<DiveSite>) => void;
  deleteDiveSite: (id: string) => void;
  fetchDiveSites: () => Promise<void>; 
  fetchDiveSite: (id: string) => Promise<void>; 
  getDiveSites: () => DiveSite[];
  getOneDiveSite: (id: string) => DiveSite | undefined;
}

const useDiveSiteStore = create<DiveSiteState>()((set, get) => ({
  diveSites: [],

  fetchDiveSites: async () => {
    try {
      const response = await fetch('/api/divesites');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched dive sites from API:", data); // Log the data being fetched
      set({ diveSites: data });  // Make sure this sets the state properly
    } catch (error) {
      console.error('Error fetching dive sites:', error);
    }
  },

  fetchDiveSite: async (id: string) => {
    try {
      const response = await axios.get(`/api/sites/${id}`);
      const diveSite = response.data;
      set((state) => ({
        diveSites: state.diveSites.map((ds) =>
          ds.id === id ? diveSite : ds
        ),
      }));
    } catch (error) {
      console.error('Error fetching dive site:', error);
    }
  },

  addDiveSite: async (diveSite: DiveSite) => {
    try {
      const response = await axios.post('/api/sites', diveSite);
      set((state) => ({ diveSites: [...state.diveSites, response.data] }));
    } catch (error) {
      console.error('Error adding dive site:', error);
    }
  },

  updateDiveSite: async (id: string, updateData: Partial<DiveSite>) => {
    try {
      const response = await axios.put(`/api/sites/${id}`, updateData);
      set((state) => ({
        diveSites: state.diveSites.map((diveSite) =>
          diveSite.id === id ? response.data : diveSite
        ),
      }));
    } catch (error) {
      console.error('Error updating dive site:', error);
    }
  },

  deleteDiveSite: async (id: string) => {
    try {
      await axios.delete(`/api/sites/${id}`);
      set((state) => ({
        diveSites: state.diveSites.filter((diveSite) => diveSite.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting dive site:', error);
    }
  },

  getDiveSites: () => get().diveSites,

  getOneDiveSite: (id: string) => 
    get().diveSites.find((diveSite) => diveSite.id === id),
}));

export default useDiveSiteStore;
