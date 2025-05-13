import React, { useEffect, useState } from 'react';
import Card from './Updatescards/cards';
<<<<<<< HEAD
import axios from 'axios';
=======
import Link from 'react-router-dom';
>>>>>>> 18aec30034aae2190472fe95a2aa92ca7caccf70

function Event() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/updates",{withCredentials:true});
      
      setData(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<<<<<<< HEAD
    <div className="p-6 bg-estg-gray-light dark:bg-black min-h-screen">
      <div className="flex gap-4">
        <a href="">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Updates
          </button>
=======
    <div className="p-6 bg-estg-gray-light dark:bg-black min-h-screen ">
      <div className="flex  gap-4">
      <a href="/createupdate">
        
       <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"

        >
           Add Updates
         
        </button>
        
>>>>>>> 18aec30034aae2190472fe95a2aa92ca7caccf70
        </a>
      </div>
      <h1 className="text-2xl font-bold text-white-800 mb-5 mt-5">Updates Cards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <Card 
            key={index}
            title={item.title}
            author={item.author.username}
            description={item.description}
            updatestype={item.type}
            onUpdate={() => console.log('Update', index)}
            onDelete={() => console.log('Delete', index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Event;
