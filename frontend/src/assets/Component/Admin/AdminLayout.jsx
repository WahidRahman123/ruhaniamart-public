import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FiToggleLeft } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSidebarOpen);
    }

  return (
    <div className='min-h-screen flex flex-col md:flex-row relative bg-white'>
        <Toaster position="top-right" />
        {/* Mobile Toggle Button */}
        <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
            <button onClick={toggleSidebar}>
                <FaBars size={24}/>
            </button>
            <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
            <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
        )}

        {/* sidebar */}
        <div className={`bg-gray-900 w-64 min-h-screen fixed text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:block z-20`}>
            {/* sidebar */}
            <AdminSidebar toggleSidebar={toggleSidebar}/>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 overflow-auto md:ml-64">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout