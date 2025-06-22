import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { blogService } from '../../services/blogService';
import type { BlogPost } from '../../types/blog';

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await blogService.getAllBlogPosts();
        setPosts(allPosts);

        // Calculate stats
        const totalPosts = allPosts.length;
        const publishedPosts = allPosts.filter(post => post.published).length;
        const draftPosts = allPosts.filter(post => !post.published).length;
        const featuredPosts = allPosts.filter(post => post.featured).length;

        setStats({
          totalPosts,
          publishedPosts,
          draftPosts,
          featuredPosts
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: '📝',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: '✅',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: '📄',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Featured',
      value: stats.featuredPosts,
      icon: '⭐',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#309f69]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-gray-600"
          >
            Welcome to the WeForward blog admin panel
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/posts/new"
              className="flex items-center p-4 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <span className="text-2xl mr-3">➕</span>
              <div>
                <div className="font-medium">Create New Post</div>
                <div className="text-sm opacity-90">Write a new blog article</div>
              </div>
            </Link>
            
            <Link
              to="/admin/posts"
              className="flex items-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="text-2xl mr-3">📝</span>
              <div>
                <div className="font-medium">Manage Posts</div>
                <div className="text-sm opacity-75">Edit existing articles</div>
              </div>
            </Link>
            
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="text-2xl mr-3">🌐</span>
              <div>
                <div className="font-medium">View Website</div>
                <div className="text-sm opacity-75">See live blog page</div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
            <Link
              to="/admin/posts"
              className="text-[#309f69] hover:text-[#277a57] font-medium text-sm"
            >
              View All →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-4">Create your first blog post to get started</p>
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <span className="mr-2">➕</span>
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? '✅ Published' : '📄 Draft'}
                      </span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                      {post.featured && (
                        <span className="ml-2 text-yellow-500">⭐</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="ml-4 px-3 py-1 text-sm text-[#309f69] hover:bg-[#309f69] hover:text-white rounded transition-colors duration-200"
                  >
                    Edit
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};
