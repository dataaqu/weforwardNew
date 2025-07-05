import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { blogService } from '../../services/blogService';
import type { BlogPost } from '../../types/blog';

export const AdminEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleKa: '',
    content: '',
    contentKa: '',
    excerpt: '',
    excerptKa: '',
    tags: [] as string[],
    tagsKa: [] as string[],
    featuredImage: '',
    published: false
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const blogPost = await blogService.getBlogPost(id);
        if (blogPost) {
          setPost(blogPost);
          setFormData({
            title: blogPost.title,
            titleKa: blogPost.titleKa,
            content: blogPost.content,
            contentKa: blogPost.contentKa,
            excerpt: blogPost.excerpt,
            excerptKa: blogPost.excerptKa,
            tags: blogPost.tags,
            tagsKa: blogPost.tagsKa,
            featuredImage: blogPost.featuredImage || '',
            published: blogPost.published
          });
        } else {
          navigate('/admin/posts');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/admin/posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !post) return;

    setSaving(true);
    try {
      await blogService.updateBlogPost(id, {
        ...formData,
        slug: blogService.generateSlug(formData.title),
        updatedAt: new Date(),
        // Keep existing fields that aren't in the form
        author: post.author,
        authorKa: post.authorKa,
        category: post.category,
        categoryKa: post.categoryKa,
        featured: post.featured,
        metaDescription: post.metaDescription,
        metaDescriptionKa: post.metaDescriptionKa,
        readTime: blogService.calculateReadTime(formData.content)
      });
      
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const handleTagsChange = (field: 'tags' | 'tagsKa', value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    handleInputChange(field, tags);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#309f69]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Post not found</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">Update your blog post content and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* Georgian Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Georgian) *
            </label>
            <input
              type="text"
              value={formData.titleKa}
              onChange={(e) => handleInputChange('titleKa', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* English Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (English) *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* Georgian Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Georgian) *
            </label>
            <textarea
              value={formData.contentKa}
              onChange={(e) => handleInputChange('contentKa', e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* English Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (English) *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* Georgian Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Georgian) *
            </label>
            <textarea
              value={formData.excerptKa}
              onChange={(e) => handleInputChange('excerptKa', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              required
            />
          </div>

          {/* Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (English) - comma separated
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
                placeholder="logistics, shipping, transport"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Georgian) - comma separated
              </label>
              <input
                type="text"
                value={formData.tagsKa.join(', ')}
                onChange={(e) => handleTagsChange('tagsKa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
                placeholder="ლოგისტიკა, გადაზიდვა, ტრანსპორტი"
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL (Optional)
            </label>
            <input
              type="url"
              value={formData.featuredImage}
              onChange={(e) => handleInputChange('featuredImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can paste an image URL here, or use the main blog editor for multi-image upload.
            </p>
          </div>

          {/* Published Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => handleInputChange('published', e.target.checked)}
              className="h-4 w-4 text-[#309f69] focus:ring-[#309f69] border-gray-300 rounded"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publish immediately
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : 'Update Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
