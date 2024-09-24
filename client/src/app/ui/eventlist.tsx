'use client';

import React, { useEffect } from 'react';
import useEventStore from '../stores/events-store'; // Adjust the path as necessary
import { useStore } from 'zustand';

const EventsList: React.FC = () => {
  const store = useStore(useEventStore);
  console.log(store);

  // Access the Zustand store's state and actions
  const { fetchEvents, getEvents } = store;

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get the events from the store
  const eventsList = getEvents();

  return (
    <div>
      <h1>Events List</h1>
      {eventsList.length > 0 ? (
        <ul>
          {eventsList.map(event => (
            <li key={event.id}>
              <div>
                <h2>{event.event_type}</h2>
                <p>Organizer: {event.organizer}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <p>Skill Level Required: {event.skill_level}</p>
                <p>Min Dive Hours: {event.min_dive_hours}</p>
                <p>Requirements: {event.requirements || 'Not specified'}</p>
                <p>Gear: {event.gear || 'Not specified'}</p>
                <p>Safety Rating: {event.safety_rating}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsList;
