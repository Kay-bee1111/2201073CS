// src/pages/FeedPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getFeedPosts } from '../services/api';
import PostCard from '../components/PostCard';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Function to load posts
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeedPosts(page);
      
      // Append new posts to existing posts
      setPosts(prevPosts => {
        // Filter out duplicates in case of API inconsistency
        const newPosts = data.filter(
          newPost => !prevPosts.some(post => post.id === newPost.id)
        );
        return [...prevPosts, ...newPosts];
      });
      
      // Check if there are more posts to load
      setHasMore(data.length > 0);
      setLoading(false);
    } catch (err) {
      setError('Failed to load feed posts');
      setLoading(false);
    }
  }, [page]);

  // Initial load
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Set up intersection observer for infinite scrolling
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="page-container">
      <h1 className="page-title">Feed</h1>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            if (posts.length === index + 1) {
              // Add ref to last element for infinite scrolling
              return (
                <div ref={lastPostElementRef} key={post.id}>
                  <PostCard post={post} />
                </div>
              );
            } else {
              return <PostCard key={post.id} post={post} />;
            }
          })
        ) : (
          !loading && <p className="no-data">No posts in feed</p>
        )}
        {loading && <div className="loading">Loading more posts...</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default FeedPage;