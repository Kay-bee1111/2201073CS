// src/components/PostCard.js
import React, { useState } from 'react';
import { getPostComments } from '../services/api';

// Random image selection
const getRandomPostImage = () => {
  const imageId = Math.floor(Math.random() * 15) + 1;
  return `/images/post${imageId}.jpg`;
};

const PostCard = ({ post, showComments = false }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComments = async () => {
    if (!isCommentsOpen && comments.length === 0) {
      setIsLoading(true);
      try {
        const data = await getPostComments(post.id);
        setComments(data);
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img 
          src={getRandomPostImage()} 
          alt={`Post by ${post.username}`}
          className="post-image"
        />
        <div className="post-user">{post.username}</div>
        <div className="post-date">{new Date(post.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>
      </div>
      <div className="post-footer">
        <div className="post-stats">
          <span className="stat-item">
            <strong>{post.commentCount}</strong> comments
          </span>
        </div>
        {showComments && (
          <button 
            className="comments-toggle" 
            onClick={handleToggleComments}
          >
            {isCommentsOpen ? 'Hide Comments' : 'Show Comments'}
          </button>
        )}
      </div>
      
      {isCommentsOpen && (
        <div className="post-comments">
          {isLoading ? (
            <div className="loading">Loading comments...</div>
          ) : (
            comments.length > 0 ? (
              <ul className="comments-list">
                {comments.map(comment => (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <strong>{comment.username}</strong>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No comments yet</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;