import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogPost from '../components/blog/BlogPost';
import { blogPosts } from '../data/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="pt-8">
      <BlogPost post={post} />
    </main>
  );
}