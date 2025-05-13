import React from 'react';
import Card from './Updatescards/cards';

function Event() {
  return (
    <div className="p-6 bg-estg-gray-light dark:bg-black min-h-screen ">
      <div className="flex  gap-4">
      <a href="">
       <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add Updates
        </button>
        </a>
      </div>
      <h1 className="text-2xl font-bold text-white-800 mb-5 mt-5">Updates Cards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(20)].map((_, index) => (
          <Card 
            key={index}
            title={'Breaking News'}
            description={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            }
            updatestype={'news'}
            onUpdate={() => console.log('Update', index)}
            onDelete={() => console.log('Delete', index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Event;
