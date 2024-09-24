// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

// const DiveForm: React.FC = () => {
//     const [diveSites, setDiveSites] = useState<object[]>([]);
//   const [formData, setFormData] = useState({
//     dive_site: '',
//     date: '',
//     duration: '', 
//     depth: 0,
//     participants: [],

//   });

//   useEffect(() => {
//     const fetchDiveSites = async () => {
//       try {
//         const response = await axios.get('/api/diveSites/'); // Replace with your actual API endpoint
//         setDiveSites(response.data); // Assuming response.data is an array of dive site names
//       } catch (error) {
//         console.error('Error fetching dive sites:', error);
//       }
//     };

//     fetchDiveSites();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/dives/', formData);
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Error submitting form', error);
//     }
//   };

//   return (
//     <form>
//       {/* <label htmlFor="dive_site">Select Dive Site:</label>
//       <select
//         name="dive_site"
//         value={formData.dive_site}
//         onChange={handleChange}
//       >
//         <option value="">Select a dive site</option>
//         {+diveSites.map((site) => (
//           <option key={site._id} value={site.name}>
//             {site.name}
//           </option>
//         ))}
//       </select> */}

//       {/* Other form inputs */}
//     </form>
//   );
// };

// export default DiveForm;
