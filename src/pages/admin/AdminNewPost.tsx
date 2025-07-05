import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BlogPostEditorSimple } from '../../components/admin/BlogPostEditorSimple';
import { blogService } from '../../services/blogService';
import type { CreateBlogPostData } from '../../types/blog';

export const AdminNewPost: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (postData: CreateBlogPostData) => {
    setLoading(true);
    try {
      await blogService.createBlogPost(postData);
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      throw error; // Let the editor handle the error display
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/posts');
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
            <p className="mt-2 text-gray-600">Write a new blog article for your website</p>
          </div>
          
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ← Back to Posts
          </button>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <BlogPostEditorSimple
            onSave={handleSave}
            onCancel={handleCancel}
            loading={loading}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
};
