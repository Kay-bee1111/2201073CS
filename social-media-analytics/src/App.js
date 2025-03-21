// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/top-users" element={<TopUsersPage />} />
            <Route path="/trending" element={<TrendingPostsPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/" element={<Navigate to="/top-users" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);