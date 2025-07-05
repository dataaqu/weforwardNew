export interface BlogPost {
  id: string;
  title: string;
  titleKa: string; // Georgian title
  content: string;
  contentKa: string; // Georgian content
  excerpt: string;
  excerptKa: string; // Georgian excerpt
  author: string;
  authorKa: string; // Georgian author name
  featuredImage: string;
  category: string;
  categoryKa: string; // Georgian category
  tags: string[];
  tagsKa: string[]; // Georgian tags
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  slug: string;
  metaDescription: string;
  metaDescriptionKa: string;
  readTime: number; // estimated read time in minutes
}

export interface BlogCategory {
  id: string;
  name: string;
  nameKa: string;
  slug: string;
  description: string;
  descriptionKa: string;
  color: string; // hex color for category badge
}

export interface CreateBlogPostData extends Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'> {
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

export interface UpdateBlogPostData extends Partial<Omit<BlogPost, 'id' | 'createdAt'>> {
  updatedAt: Date;
}
