import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import logo from '../../assets/logo.png';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout');
    }
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: '📊',
      description: 'Overview & Analytics'
    },
    { 
      name: 'All Posts', 
      href: '/admin/posts', 
      icon: '📝',
      description: 'Manage Blog Posts'
    },
    { 
      name: 'New Post', 
      href: '/admin/posts/new', 
      icon: '➕',
      description: 'Create New Article'
    },
    { 
      name: 'Categories', 
      href: '/admin/categories', 
      icon: '📁',
      description: 'Manage Categories'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center bg-gradient-to-r from-[#309f69] to-[#2ff9c3] relative">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="WeForward Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#309f69]'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs ${
                    location.pathname === item.href 
                      ? 'text-white/80' 
                      : 'text-gray-500 group-hover:text-[#309f69]/80'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-3 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-700">Admin</div>
              <div className="text-xs text-gray-500">WeForward Admin</div>
            </div>
          </div>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <span className="mr-3">🚪</span>
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
