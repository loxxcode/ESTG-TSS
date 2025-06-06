import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileData {
  user: string;
  email: string;
  avatar?: string;
  role?: string;
}

function Profile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/account/dashboard', {
        withCredentials: true
      });
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to fetch profile data');
      console.error('Profile data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/account/logout', { withCredentials: true });
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20">
      <div className="bg-white dark:bg-black dark:shadow-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage 
              src={profileData?.avatar || ''} 
              alt={profileData?.user || 'User'} 
            />
            <AvatarFallback>
              {profileData?.user?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-2xl font-bold mb-1 dark:text-white">
            {profileData?.user || localStorage.getItem("username")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {profileData?.email || localStorage.getItem("email")}
          </p>

          <div className="w-full max-w-md">
            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Profile Information</h3>
              <div className="space-y-4">

                {/* Email */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                    <button
                      onClick={() => {
                        setIsEditingEmail(!isEditingEmail);
                        setNewEmail(profileData?.email || localStorage.getItem("email") || '');
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  {isEditingEmail ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        onClick={async () => {
                          try {
                            await axios.put('http://localhost:5000/api/account/updateprofile', 
                              { email: newEmail },
                              { withCredentials: true }
                            );
                            setIsEditingEmail(false);
                            await handleLogout();
                          } catch (err) {
                            console.error('Failed to update email:', err);
                          }
                        }}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-white">
                      {profileData?.email || localStorage.getItem("email")}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Username</label>
                    <button
                      onClick={() => {
                        setIsEditingUsername(!isEditingUsername);
                        setNewUsername(profileData?.user || localStorage.getItem("username") || '');
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  {isEditingUsername ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        onClick={async () => {
                          try {
                            await axios.put('http://localhost:5000/api/account/updateprofile', 
                              { username: newUsername },
                              { withCredentials: true }
                            );
                            setIsEditingUsername(false);
                            await handleLogout();
                          } catch (err) {
                            console.error('Failed to update username:', err);
                          }
                        }}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-white">
                      {profileData?.user || localStorage.getItem("username")}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Password</label>
                    <button
                      onClick={() => {
                        setIsEditingPassword(!isEditingPassword);
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  {isEditingPassword ? (
                    <div className="space-y-2 mt-1">
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            if (newPassword !== confirmPassword) {
                              toast.error('Passwords do not match', { position: 'bottom-right' });
                              return;
                            }
                            try {
                              await axios.put('http://localhost:5000/api/account/updateprofile', 
                                { password: newPassword },
                                { withCredentials: true }
                              );
                              setIsEditingPassword(false);
                              setNewPassword('');
                              setConfirmPassword('');
                              toast.success('Password updated successfully', { position: 'bottom-right' });
                              await handleLogout();
                            } catch (err) {
                              console.error('Failed to update password:', err);
                              toast.error('Failed to update password', { position: 'bottom-right' });
                            }
                          }}
                          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingPassword(false);
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                          className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">********</p>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
