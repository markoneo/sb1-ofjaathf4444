import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    slug: 'airport-transfer-guide',
    title: 'Airport Transfer Guide',
    excerpt: 'Learn about airport transfers in Europe',
    content: `Airport Transfer Guide

Planning Your Airport Transfer

When traveling to a new city, getting from the airport to your destination should be easy and stress-free. Here's what you need to know:

Benefits of Private Transfers:
- Door-to-door service
- No waiting in taxi queues
- Fixed price known in advance
- Professional drivers

Tips for Smooth Transfer:
1. Book in advance
2. Provide flight details
3. Keep driver's contact information
4. Have your accommodation address ready`,
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000',
    publishedAt: '2024-02-15',
    readTime: 5,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      bio: 'Travel Expert'
    }
  },
  {
    slug: 'venice-transfers',
    title: 'Venice Airport Transfers',
    excerpt: 'Guide to Venice airport transportation',
    content: `Venice Airport Transfer Guide

Getting from Marco Polo Airport to Venice

Transportation Options:
- Private water taxi
- Shared water bus
- Land taxi
- Private car service

Tips:
- Book in advance
- Check hotel location
- Consider group size
- Plan for luggage`,
    coverImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=1000',
    publishedAt: '2024-02-10',
    readTime: 4,
    author: {
      name: 'Marco Rossi',
      avatar: 'https://i.pravatar.cc/150?u=marco',
      bio: 'Venice Local Guide'
    }
  },
  {
    slug: 'eco-travel',
    title: 'Eco-Friendly Travel',
    excerpt: 'Sustainable transportation tips',
    content: `Eco-Friendly Travel Guide

Sustainable Transportation Options:
- Electric vehicles
- Shared rides
- Public transport
- Bicycle rentals

Benefits:
- Lower carbon footprint
- Support local communities
- Cost effective
- Better experience`,
    coverImage: 'https://images.unsplash.com/photo-1464851707681-f9d5fdaccea8?auto=format&fit=crop&q=80&w=1000',
    publishedAt: '2024-02-05',
    readTime: 3,
    author: {
      name: 'Emma Green',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      bio: 'Sustainable Travel Expert'
    }
  }
];