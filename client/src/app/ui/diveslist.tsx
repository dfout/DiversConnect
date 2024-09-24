'use client';

import React, { useEffect } from 'react';
import useDiveStore from '../stores/dives-store'; // Adjust the path as necessary
import { useStore } from 'zustand';

const DivesList: React.FC = () => {
  const store = useStore(useDiveStore);
  console.log(store);

  // Access the Zustand store's state and actions
  const { fetchDives } = store;
  const divesList = store.getDive()
  // Fetch dives when the component mounts
  useEffect(() => {
    fetchDives();
  }, [fetchDives]);

  // Get the dives from the store

  return (
    <div>
      {/* <h1>Dives List</h1> */}
      {divesList.length > 0 ? (
        <ul>
          {divesList.map(dive => (
            <li key={dive.id}>
              <div>
                <h2>Dive Site: {dive.dive_site.name}</h2>
                <p>Date: {new Date(dive.date).toLocaleDateString()}</p>
                <p>Duration: {dive.duration ? `${dive.duration} minutes` : 'Not specified'}</p>
                <p>Depth: {dive.depth ? `${dive.depth} meters` : 'Not specified'}</p>
                <p>Participants: {dive.participants[0].username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No dives found.</p>
      )}
    </div>
  );
};

export default DivesList;
