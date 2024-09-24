import { create } from 'zustand';
import axios from 'axios';

interface Event {
  id: string;
  organizer: string; // User ID as string
  event_type: "in-search-of" | "event";
  location: string;
  date: Date;
  time: string;
  description?: string;
  requirements?: string[];
  gear?: string[];
  skill_level?: string;
  safety_rating?: number;
  min_skill_level?: string;
  min_dive_hours?: number;
  attendees: string[]; // Array of User IDs
  created_at: Date;
  updated_at: Date;
}

interface EventState {
  events: Event[];
  addEvent: (event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (id: string, updateData: Partial<Event>) => Promise<void>;
  setEvents: (events: Event[]) => void;
  fetchEvents: () => Promise<void>; // Fetch all events from the backend
  fetchEvent: (id: string) => Promise<void>; // Fetch a single event by ID
  getEvents: () => Event[]; // Get all events
  getOneEvent: (id: string) => Event | undefined; // Get a single event by ID
  getUserEvents: (userId: string) => Event[]; // Get events organized by a specific user
}

// Zustand event store
const useEventStore = create<EventState>()((set, get) => ({
  events: [],

  // Fetch all events from the backend
  fetchEvents: async () => {
    try {
      const response = await axios.get('/api/events');
      set({ events: response.data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  },

  // Fetch a single event by ID from the backend
  fetchEvent: async (id: string) => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      const event = response.data;
      set((state) => ({
        events: state.events.map((ev) =>
          ev.id === id ? event : ev
        ),
      }));
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  },

  // Add a new event to the backend
  addEvent: async (event: Event) => {
    try {
      const response = await axios.post('/api/events', event);
      set((state) => ({ events: [...state.events, response.data] }));
    } catch (error) {
      console.error('Error adding event:', error);
    }
  },

  // Update an event by ID in the backend
  updateEvent: async (id: string, updateData: Partial<Event>) => {
    try {
      const response = await axios.put(`/api/events/${id}`, updateData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        ),
      }));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  },

  // Delete an event by ID from the backend
  deleteEvent: async (id: string) => {
    try {
      await axios.delete(`/api/events/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  },

  // Set multiple events directly in state
  setEvents: (events: Event[]) => set(() => ({ events })),

  // Get all events
  getEvents: () => get().events,

  // Get a single event by ID
  getOneEvent: (id: string) => get().events.find((event) => event.id === id),

  // Get all events organized by a specific user
  getUserEvents: (userId: string) =>
    get().events.filter((event) => event.organizer === userId),
}));

export default useEventStore;
