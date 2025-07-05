import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { blogService } from '../../services/blogService';
import type { BlogPost } from '../../types/blog';

export const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogService.getAllBlogPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await blogService.deleteBlogPost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="mt-2 text-gray-600">Manage your blog articles</p>
          </div>
          
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <span className="mr-2">➕</span>
            New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.published).length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {posts.filter(p => !p.published).length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'all'
                  ? 'bg-[#309f69] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts ({posts.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'published'
                  ? 'bg-[#309f69] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({posts.filter(p => p.published).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'draft'
                  ? 'bg-[#309f69] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Drafts ({posts.filter(p => !p.published).length})
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No posts yet' : `No ${filter} posts`}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Create your first blog post to get started'
                  : `No posts in ${filter} status`
                }
              </p>
              {filter === 'all' && (
                <Link
                  to="/admin/posts/new"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <span className="mr-2">➕</span>
                  Create First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            post.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? '✅ Published' : '📄 Draft'}
                          </span>
                          {post.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                        <span>•</span>
                        <span>{post.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="ml-6 w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    {post.published && (
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                      >
                        View
                      </Link>
                    )}
                    
                    <Link
                      to={`/admin/posts/edit/${post.id}`}
                      className="inline-flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
