
const API_URL = 'http://localhost:3000';

// Cache mechanism to store API responses and reduce calls
const cache = {
  data: {},
  timestamp: {},
  // Cache data for 30 seconds
  CACHE_DURATION: 30 * 1000,
};

// Generic fetch function with error handling and caching
const fetchWithCache = async (endpoint) => {
  const now = Date.now();
  const cacheKey = endpoint;
  
  // Return cached data if valid
  if (cache.data[cacheKey] && 
      now - cache.timestamp[cacheKey] < cache.CACHE_DURATION) {
    return cache.data[cacheKey];
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update cache
    cache.data[cacheKey] = data;
    cache.timestamp[cacheKey] = now;
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

// API functions
export const getTopUsers = () => fetchWithCache('/users/top');
export const getTrendingPosts = () => fetchWithCache('/posts/trending');
export const getFeedPosts = () => fetchWithCache('/posts/feed');
export const getUserPosts = (userId) => fetchWithCache(`/users/${userId}/posts`);
export const getPostComments = (postId) => fetchWithCache(`/posts/${postId}/comments`);