'use client';

import React from 'react';
// import useDiveStore from '@/app/stores/dives-store'; // Adjust the path as necessary


const diveForm: React.FC = () => {
    // Zustand state for dive management
    // const { addDive, fetchDives } = useDiveStore();

    // Local state for form control
    // const [diveSite, setDiveSite] = useState('')
    // const [diveSiteId, setDiveSiteID] = useState('');
    // const [date, setDate] = useState('')
    // const [duration, setDuration] = useState('')
    // const [depth, setDepth] = useState(0)
    // const [participants, setParticipants] = useState([])
    // const [timeUnder, setTimeUnder] = useState(0)

    // useEffect(()=>{
    //     fetchDives()
    // },[fetchDives])

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // find the Id of the diveSite
    //     const site = diveSite
    //     const dive = {
    //         diveSiteId, 
    //         date, 
    //         duration: duration || null, 
    //         depth: depth || null, 
    //         participants, 
    //         time_underwater: timeUnder || null, 

    //     }

    //     addDive(dive); // Add dive to Zustand store
    //     setDiveSite(''); // Clear the input field after submission
    // };

    return (
        <h2>Dive Form</h2>
        // <form className="form" onSubmit={handleSubmit}>
        //     <input
        //         type="text"
        //         value={diveSite}
        //         onChange={(e) => setDiveSite(e.target.value)}
        //         placeholder="Enter dive site"
        //     />
        //     <button type="submit">Add Dive</button>
        // </form>
    );
};

export default diveForm;
