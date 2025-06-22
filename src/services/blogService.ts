import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { BlogPost, CreateBlogPostData, UpdateBlogPostData } from '../types/blog';

export class BlogService {
  private collectionName = 'blogPosts';

  // Create new blog post
  async createBlogPost(postData: CreateBlogPostData): Promise<string> {
    try {
      const docData = {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: postData.published ? serverTimestamp() : null
      };
      
      const docRef = await addDoc(collection(db, this.collectionName), docData);
      return docRef.id;
      
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      
      // More specific error messages
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please check your Firestore security rules.');
      } else if (error.code === 'unavailable') {
        throw new Error('Firestore is currently unavailable. Please try again later.');
      } else if (error.code === 'invalid-argument') {
        throw new Error('Invalid data provided. Please check your form inputs.');
      } else {
        throw new Error(`Failed to create blog post: ${error.message || error}`);
      }
    }
  }

  // Update blog post
  async updateBlogPost(id: string, updates: UpdateBlogPostData): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        publishedAt: updates.published && !updates.publishedAt ? serverTimestamp() : updates.publishedAt
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error(`Failed to update blog post: ${error}`);
    }
  }

  // Delete blog post
  async deleteBlogPost(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error(`Failed to delete blog post: ${error}`);
    }
  }

  // Get ALL blog posts (for admin)
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      
      const posts = querySnapshot.docs.map(doc => {
        return this.convertFirestoreDoc(doc);
      });
      
      return posts;
      
    } catch (error: any) {
      console.error('Error fetching all blog posts:', error);
      throw new Error(`Failed to fetch all blog posts: ${error.message || error}`);
    }
  }

  // Get published blog posts (for public)
  async getPublishedBlogPosts(limitCount?: number): Promise<BlogPost[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        where('published', '==', true)
      );

      const querySnapshot = await getDocs(q);
      
      const posts = querySnapshot.docs.map(doc => {
        return this.convertFirestoreDoc(doc);
      });
      
      // Sort by publishedAt in memory instead of in query
      posts.sort((a, b) => {
        const dateA = a.publishedAt ? a.publishedAt.getTime() : 0;
        const dateB = b.publishedAt ? b.publishedAt.getTime() : 0;
        return dateB - dateA; // Descending order
      });
      
      // Apply limit if specified
      const finalPosts = limitCount ? posts.slice(0, limitCount) : posts;
      
      return finalPosts;
      
    } catch (error: any) {
      console.error('Error fetching published blog posts:', error);
      throw new Error(`Failed to fetch published blog posts: ${error.message || error}`);
    }
  }

  // Get single blog post by ID
  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return this.convertFirestoreDoc(docSnap);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error(`Failed to fetch blog post: ${error}`);
    }
  }

  // Get blog post by slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('slug', '==', slug),
        where('published', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return this.convertFirestoreDoc(querySnapshot.docs[0]);
      } else {
        return null;
      }
    } catch (error: any) {
      console.error('Error fetching blog post by slug:', error);
      throw new Error(`Failed to fetch blog post: ${error.message || error}`);
    }
  }

  // Upload image
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size too large. Maximum 10MB allowed.');
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
      }
      
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const fullPath = `blog-images/${path}/${fileName}`;
      
      const storageRef = ref(storage, fullPath);
      const snapshot = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      // More specific error messages
      if (error.code === 'storage/unauthorized') {
        throw new Error('Permission denied. Please check your Firebase Storage security rules.');
      } else if (error.code === 'storage/quota-exceeded') {
        throw new Error('Storage quota exceeded. Please contact administrator.');
      } else if (error.code === 'storage/unauthenticated') {
        throw new Error('Not authenticated. Please log in again.');
      } else {
        throw new Error(`Failed to upload image: ${error.message || error}`);
      }
    }
  }

  // Delete image
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for image deletion failures
    }
  }

  // Helper method to convert Firestore document to BlogPost
  private convertFirestoreDoc(doc: any): BlogPost {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      publishedAt: data.publishedAt?.toDate() || null
    } as BlogPost;
  }

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Calculate read time
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

export const blogService = new BlogService();
