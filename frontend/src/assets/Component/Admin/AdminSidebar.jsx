import React, { useContext } from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContextProvider';
import { CartContext } from '../../../context/CartContextProvider';

const AdminSidebar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { clearCart } = useContext(CartContext);

    const handleLogout = async () => {
        await logout();
        await clearCart();
        navigate('/');
    }

  return (
    <div className='p-6 min-h-screen '>
        <div className="mb-6">
            <Link to='/admin' className='text-2xl font-medium'>
            RMart</Link>
        </div>
        <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

        <nav className="flex flex-col space-y-2">
            <NavLink onClick={toggleSidebar} to='/admin/users' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaUser />
                <span>Users</span>
            </NavLink>
            
            <NavLink onClick={toggleSidebar} to='/admin/banners' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaUser />
                <span>Banner</span>
            </NavLink>

            <NavLink onClick={toggleSidebar} to='/admin/category' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <MdCategory />
                <span>Category</span>
            </NavLink>

            <NavLink onClick={toggleSidebar} to='/admin/products' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaBoxOpen />
                <span>Products</span>
            </NavLink>

            <NavLink onClick={toggleSidebar} to='/admin/orders' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaClipboardList />
                <span>Orders</span>
            </NavLink>

            <NavLink onClick={toggleSidebar} to='/' className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaStore />
                <span>Shop</span>
            </NavLink>
        </nav>
        <div className='mt-6'>
            <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2'>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>
    </div>
  )
}

export default AdminSidebar