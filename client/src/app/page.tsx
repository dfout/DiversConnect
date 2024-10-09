// import Image from "next/image";
import React from 'react';
import UsersList from './ui/userslist';
import DivesList from './ui/diveslist';
import DiveSitesList from './ui/divesitelist';
import PostsList from './ui/postslist';
import EventsList from './ui/eventlist';



export default function Example() {
  return (
    <>
    <h2>Divers Near You</h2>
    <UsersList/>
     <h2>Dives</h2>
    <DivesList />
    <h2>Dive Sites</h2>
    <DiveSitesList />
    <h2>Posts</h2>
    <PostsList />
    <h2>Events</h2>
    <EventsList />
    </>

  )
}

