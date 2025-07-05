import React from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const AdminCategories: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-600">Manage blog post categories</p>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
        >
          <div className="text-6xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Category management feature is under development.
          </p>
          <p className="text-sm text-gray-500">
            For now, you can add categories directly when creating blog posts.
          </p>
        </motion.div>
      </div>
    </AdminLayout>
  );
};
