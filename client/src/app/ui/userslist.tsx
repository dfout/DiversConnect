'use client';

import React, { useEffect } from 'react';
import useUserStore from '../stores/users-store'; // Adjust the path as necessary
import { useStore } from 'zustand';

const UsersList: React.FC = () => {
    const store = useStore(useUserStore);
    console.log(store);
  // Access the Zustand store's state and actions
  const { fetchUsers, getUsers } = store

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Get the users from the store
  const userList = getUsers();

  return (
    <div>
      <h1>Users List</h1>
      {userList.length > 0 ? (
        <ul>
          {userList.map(user => (
            <li key={user.id}>
              <div>
                <img src={user.profile_picture || '/default-profile.png'} alt={`${user.username}'s profile`} width={50} height={50} />
                <div>
                  <h2>{user.username}</h2>
                  <p>Email: {user.email}</p>
                  <p>Location: {user.location || 'Not specified'}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
