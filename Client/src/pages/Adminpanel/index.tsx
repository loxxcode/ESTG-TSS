import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Update from './Adminpages/update';
import Event from './Adminpages/event';
import UserManagement from './Adminpages/usermagement';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adminpanel() {
  const [activeTab, setActiveTab] = React.useState(0);
  const navigate = useNavigate()
    React.useEffect(() => {
  if (!localStorage.getItem("username")) {
    navigate('/');
  }
}, [navigate]);
 const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/account/logout', { withCredentials: true });
      navigate('/');
      localStorage.removeItem("username")
      localStorage.removeItem("role")
      localStorage.removeItem("email")
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const tabs = [
    { name: 'Updates', component: <Update /> },
    { name: 'Events', component: <Event /> },
    { name: 'View Users', component: <UserManagement /> },
  ];

  return (
    <div className="min-h-screen bg-estg-gray-light dark:bg-black">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-estg-gray-light dark:bg-black">
        <Navbar />
      </div>

      {/* Layout after navbar */}
      <div className="pt-16 flex">
        {/* Fixed Sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-estg-gray-light dark:bg-black border-r shadow-md z-40">
          <nav className="flex flex-col gap-2 p-4 bg-estg-gray-light dark:bg-black">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-md text-left transition-colors w-full ${activeTab === index
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-700 text-white-700'
                  }`}
              >
                <p className='text-dark-800 dark:text-white'>{tab.name}</p>
              </button>
            ))}
<<<<<<< HEAD
            <button onClick={handleLogout} className='mt-[340px] block px-3 py-2 rounded-md text-base font-medium transition-colors bg-blue-700 text-white hover:bg-blue-600'>Logout</button>
=======
            <button onClick={handleLogout} className='mt-[340px] block px-3 py-2 rounded-md text-base font-medium transition-colors bg-red-500 text-white hover:bg-red-600'>Logout</button>
>>>>>>> 616596a19bd5f6ffd62f295b02bee3e085b73ac4
          </nav>
        </aside>

        {/* Main content with margin to avoid overlapping fixed sidebar */}
        <main className="flex-1 ml-0 md:ml-64 p-6 min-h-[calc(100vh-4rem)] bg-estg-gray-light dark:bg-black overflow-y-auto">
          {tabs[activeTab].component}
          
        </main>
      </div>
    </div>
  );
}

export default Adminpanel;
