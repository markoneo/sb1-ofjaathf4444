import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BlogPost as BlogPostType } from '../../types/blog';
import { formatDate } from '../../utils/formatting';
import Button from '../ui/Button';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Button
        href="/blog"
        variant="secondary"
        className="mb-8 inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Button>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-500 mb-6">
          <span className="flex items-center gap-2">
            <Calendar size={18} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} />
            {post.readTime} min read
          </span>
        </div>

        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </header>

      <div className="prose max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          )
        ))}
      </div>

      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">
              {post.author.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {post.author.bio}
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}