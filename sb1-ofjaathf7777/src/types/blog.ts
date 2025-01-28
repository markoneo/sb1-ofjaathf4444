export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: Author;
}