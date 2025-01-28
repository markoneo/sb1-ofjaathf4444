import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/formatting';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <a href={`/blog/${post.slug}`} className="block">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {post.readTime} min read
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{post.author.name}</span>
          </div>
        </div>
      </a>
    </article>
  );
}