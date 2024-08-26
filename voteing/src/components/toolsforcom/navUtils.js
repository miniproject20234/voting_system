// src/navUtils.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const Nav = ({ email }) => {
  const navigate = useNavigate();
  const username = email && email.includes('@') ? email.split('@')[0] : 'User Not logged';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email"); 
    window.location.reload();
    navigate('/'); 
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className='text-green-500'>
        UserName: {username}
      </div>     
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           Log Out
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <AlertDialog.Title className="text-lg font-bold">Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-gray-600">
              This action cannot be undone. This will remove your data.
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end space-x-4">
              <AlertDialog.Cancel asChild>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Nav;
