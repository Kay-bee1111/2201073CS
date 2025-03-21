// src/pages/TrendingPostsPage.js
import React, { useState, useEffect } from 'react';
import { getTrendingPosts } from '../services/api';
import PostCard from '../components/PostCard';

const TrendingPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const data = await getTrendingPosts();
        
        // Sort posts by comment count in descending order
        const sortedPosts = [...data].sort((a, b) => b.commentCount - a.commentCount);
        
        // If multiple posts have the same max comment count, include all of them
        const maxCommentCount = sortedPosts[0]?.commentCount || 0;
        const mostCommentedPosts = sortedPosts.filter(
          post => post.commentCount === maxCommentCount
        );
        
        setPosts(mostCommentedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending posts');
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <div className="loading">Loading trending posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Trending Posts</h1>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} showComments={true} />
          ))
        ) : (
          <p className="no-data">No trending posts found</p>
        )}
      </div>
    </div>
  );
};

export default TrendingPostsPage;