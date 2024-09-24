'use client';

import React, { useEffect } from 'react';
import useDiveSiteStore from '../stores/divesite-store'; // Adjust the path as necessary
import { useStore } from 'zustand';

const DiveSitesList: React.FC = () => {
  const store = useStore(useDiveSiteStore);
  console.log(store);

  // Access the Zustand store's state and actions
  const { fetchDiveSites, getDiveSites } = store;

  // Fetch dive sites when the component mounts
  useEffect(() => {
    fetchDiveSites();
  }, [fetchDiveSites]);

  // Get the dive sites from the store
  const diveSitesList = getDiveSites();

  

  return (
    <div>
      <h1>Dive Sites List</h1>
      {diveSitesList.length > 0 ? (
        <ul>
          {diveSitesList.map(diveSite => (
            <li key={diveSite.id}>
              <div>
                <h2>{diveSite.name}</h2>
                <p>Location: {diveSite.location.country}, {diveSite.location.region}</p>
                <p>Coordinates: {diveSite.location.coordinates.lat}, {diveSite.location.coordinates.lng}</p>
                <p>Depth Range: {diveSite.depth_range.min_depth} - {diveSite.depth_range.max_depth} meters</p>
                <p>Difficulty Level: {diveSite.difficulty_level}</p>
                <p>Marine Life: {diveSite.marine_life || 'Not specified'}</p>
                <p>Safety Rating: {diveSite.safety_rating}</p>
                <p>Dive Conditions: {diveSite.dive_conditions?.visibility && diveSite.dive_conditions?.current || 'Not specified'}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No dive sites found.</p>
      )}
    </div>
  );
};

export default DiveSitesList;
