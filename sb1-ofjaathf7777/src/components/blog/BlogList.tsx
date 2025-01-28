import React from 'react';
import { blogPosts } from '../../data/blogPosts';
import BlogPostCard from './BlogPostCard';
import SectionTitle from '../ui/SectionTitle';

export default function BlogList() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Latest from Our Blog"
          subtitle="Stay updated with travel tips, industry news, and insider guides"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}