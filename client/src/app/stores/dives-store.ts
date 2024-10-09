import { create } from "zustand";
import axios from "axios";

interface Dive {
  id: string;
  dive_site: DiveSite;
  date: Date;
  duration?: number;
  depth?: number;
  participants: Participant[]; // User ids as strings
  created_at: Date;
}

interface DiveSite {
  id: string;
  name: string;
}

interface Participant {
  userId: string;
  username: string;
}

interface DiveState {
  dives: Dive[];
  addDive: (dive: object) => Promise<void>; // Add a new dive
  deleteDive: (id: string) => Promise<void>; // Delete a dive by ID
  updateDive: (id: string, updateData: Partial<Dive>) => Promise<void>; // Update a dive by ID
  setDives: (dives: Dive[]) => void; // Set dives in state
  fetchDives: () => Promise<void>; // Fetch all dives
  fetchDive: (id: string) => Promise<void>; // Fetch a single dive by ID
  getDive: () => Dive[]; // Get all dives
  getOneDive: (id: string) => Dive | undefined; // Get a single dive by ID
  // getUsersDives: (userId: string) => Dive[]; // Get dives by a specific user
}

// Zustand dive store
const useDiveStore = create<DiveState>()((set, get) => ({
  dives: [],

  // Fetch all dives from the backend
  fetchDives: async () => {
    try {
      const response = await axios.get("/api/dives");
      set({ dives: response.data });
    } catch (error) {
      console.error("Error fetching dives:", error);
    }
  },

  // Fetch a single dive by ID
  fetchDive: async (id: string) => {
    try {
      const response = await axios.get(`/api/dives/${id}`);
      const fetchedDive: Dive = response.data; // Correctly type the fetched data
      set((state) => ({
        dives: state.dives.map((dive) => (dive.id === id ? fetchedDive : dive)),
      }));
    } catch (error) {
      console.error("Error fetching dive:", error);
    }
  },

  // Add a new dive
  addDive: async (dive:object) => {
    try {
      const response = await axios.post("/api/dives", dive);
      set((state) => ({ dives: [...state.dives, response.data] }));
    } catch (error) {
      console.error("Error adding dive:", error);
    }
  },

  // Update a dive by ID
  updateDive: async (id: string, updateData: Partial<Dive>) => {
    try {
      const response = await axios.put(`/api/dives/${id}`, updateData);
      set((state) => ({
        dives: state.dives.map((dive) =>
          dive.id === id ? response.data : dive
        ),
      }));
    } catch (error) {
      console.error("Error updating dive:", error);
    }
  },

  // Delete a dive by ID
  deleteDive: async (id: string) => {
    try {
      await axios.delete(`/api/dives/${id}`);
      set((state) => ({
        dives: state.dives.filter((dive) => dive.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting dive:", error);
    }
  },

  // Set dives directly in state
  setDives: (dives: Dive[]) => set({ dives }),

  // Get a single dive by ID
  getOneDive: (id: string) => get().dives.find((dive) => dive.id === id),

  // Get all dives
  getDive: () => get().dives,

  // Get all dives for a specific user by userId
  // getUsersDives: (userId: string) =>
    // get().dives.filter((dive) => dive.participants.includes(userId)),
}
));

export default useDiveStore;
