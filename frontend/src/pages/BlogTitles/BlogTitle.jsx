import React, { useState } from 'react';
import './BlogTitles.css';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { Hash } from 'lucide-react';

const BlogTitle = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const categories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'];
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword) {
      toast.error("Please enter a keyword.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const prompt = `Generate a title for the blog post about ${keyword} in the ${selectedCategory} category`;
      const token = await getToken();
      const response = await axios.post('/api/ai/generate-blog-title', { prompt }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const serverData = response.data;

      if (serverData.success) {
        // --- THIS IS THE KEY CHANGE ---
        // Ensure the content is a string before setting the state
        if (typeof serverData.content === 'string') {
          setContent(serverData.content);
        } else {
          // If it's not a string, convert it to one to prevent the ReactMarkdown error
          setContent(JSON.stringify(serverData.content));
        }
        toast.success("Title generated successfully!");
      } else {
        toast.error(serverData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("API call failed:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="blog-title-container">
      <form className="left-box" onSubmit={handleSubmit}>
        <h3>✨ AI Title Generator</h3>
        <label>Keyword</label>
        <input
          type="text"
          placeholder="The future of artificial intelligence"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label>Category</label>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button disabled={loading} type="submit" className="generate-btn2">
          {loading ? <span className='spinner'></span> : <Hash size={16} />}
          Generate title
        </button>
      </form>

      {!content ? (
        <div className="right-box">
          <h3># Generated titles</h3>
          <div className="placeholder">
            <div className="hash-icon">#</div>
            <p>Enter keywords and click "Generate Titles" to get started</p>
          </div>
        </div>
      ) : (
        <div className="custom-container-special">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default BlogTitle;
