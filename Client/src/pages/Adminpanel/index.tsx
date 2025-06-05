import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Update from './Adminpages/update';
import Event from './Adminpages/event';
import UserManagement from './Adminpages/usermagement';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, PanelLeftOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import Profile from './Adminpages/Profile';

interface DashboardData {
  user: string;
  email: string;
  avatar?: string;
}
function Adminpanel() {
  const [activeTab, setActiveTab] = React.useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [dashboardData, setDashboardData] = React.useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const navigate = useNavigate()

  const isAdmin = localStorage.getItem("role") === "Admin";

  React.useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/account/dashboard', {
        withCredentials: true
      });
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboardData();
}, []);

React.useEffect(() => {
  setShowProfile(false);
}, [activeTab]);


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
    ...(isAdmin ? [{ name: 'Content Creators', component: <UserManagement /> }] : []),
    ...(isProfileOpen ? [{ name: 'Profile', component: <Profile /> }] : []),
  ];


  return (
    <div className="min-h-screen bg-estg-gray-light dark:bg-black">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 bg-estg-gray-light dark:bg-black">
        <Navbar />
      </div>

      {/* Layout after navbar */}
      <div className="pt-4 flex">
        {/* Sidebar - Hidden on mobile by default, shown when isSidebarOpen is true */}
        <aside 
          className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-estg-gray-light dark:bg-black border-r shadow-md z-30 transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <nav className="flex flex-col gap-2 p-4 bg-estg-gray-light dark:bg-black">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  // Close sidebar on mobile after selecting a tab
                  if (window.innerWidth < 768) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`px-4 py-2 rounded-md text-left transition-colors w-full ${
                  activeTab === index
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-700 text-white-700'
                }`}
              >
                <p className='text-dark-800 dark:text-white'>{tab.name}</p>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-3 py-2 mt-72 rounded-md text-base font-medium transition-colors bg-red-500 text-white hover:bg-red-600'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
            <div className="flex items-center gap-2 px-1 py-2 text-left text-sm cursor-pointer" 
              onClick={() => {
              setShowProfile(true);
              if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
              }
            }}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage 
                  src={dashboardData?.avatar || ''} 
                  alt={dashboardData?.user || 'User'} 
                />
                <AvatarFallback className="rounded-lg">
                  {dashboardData?.user?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading ? (
                  <span className="truncate font-medium">Loading...</span>
                ) : error ? (
                  <span className="truncate font-medium text-red-500">Error loading profile</span>
                ) : (
                  <>
                    <span className="truncate font-medium">{dashboardData?.user}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {dashboardData?.email}
                    </span>
                  </>
                )}
              </div>
            </div>
           


          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content with margin to avoid overlapping fixed sidebar */}
        <main className="flex-1 ml-0 md:ml-64 p-6 min-h-[calc(100vh-4rem)] bg-estg-gray-light dark:bg-black overflow-y-auto">
          {showProfile ? <Profile /> : tabs[activeTab].component}
        </main>
      </div>
    </div>
  );
}

export default Adminpanel;
