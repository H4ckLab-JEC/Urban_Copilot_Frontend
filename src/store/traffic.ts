import { create } from 'zustand';

interface Event {
  id: number;
  event_type: string;
  location_lat: number;
  location_lon: number;
  severity?: number;
  description?: string;
  timestamp: string;
}

interface TrafficStore {
  events: Event[];
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
}

export const useTrafficStore = create<TrafficStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [event, ...state.events] })),
}));
