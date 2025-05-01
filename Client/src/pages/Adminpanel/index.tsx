// Adminpanel.js
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Update from './Adminpages/update';
import Event from './Adminpages/event';
import Logout from './Adminpages/logout';

function Adminpanel() {
  const [activeTab, setActiveTab] = React.useState(0);
  
  const tabs = [
    { name: 'Updates', component: <Update /> },
    { name: 'Events', component: <Event /> },
    { name: 'Logout', component: <Logout /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
              <nav className="flex md:flex-col gap-2 p-2 bg-white rounded-lg shadow">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-md text-left transition-colors ${
                      activeTab === index
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            {/* Content Area */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow">
              {tabs[activeTab].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpanel;