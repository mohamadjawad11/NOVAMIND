import React, { useState } from 'react';
import './WriteArticle.css';
import { Copy, Edit, FileText, PenTool } from 'lucide-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const WriteArticle = () => {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('');

  const handleLengthClick = (value) => {
    setLength(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Submitted topic:', topic);
    console.log('Selected length:', length);
  };

  return (
    <div className="write-article-container">
      <form className="article-box" onSubmit={handleSubmit}>
        <h2><PenTool size={20} /> AI Article Writer</h2>

        <label htmlFor="topic-input">Article Topic</label>
        <input
          type="text"
          id="topic-input"
          placeholder="Enter article topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <p className="length-label">Article Length</p>
        <div className="length-options">
          <button
            type="button"
            className={length === 'short' ? 'selected' : ''}
            onClick={() => handleLengthClick('short')}
          >
            Short (200 - 400 words)
          </button>

          <button
            type="button"
            className={length === 'medium' ? 'selected' : ''}
            >medium (400 - 600 words)
              
            </button>

          <button
            type="button"
            className={length === 'long' ? 'selected' : ''}
            onClick={() => handleLengthClick('long')}
          >
            Long (600 - 800 words)
          </button>
        </div>

        <button type="submit" className="generate-btn">
          <FileText size={16} /> Generate Article
        </button>
      </form>

    <div className="generated-box">
      <div className="generated-content">
     <h2><Copy size={18} /> Generated article</h2>
     <div className="icon-wrapper">
      <Edit size={36} strokeWidth={1.5} />
     </div>
     <p className="placeholder-text">
      Enter a topic and click <strong>“Generate article”</strong> to get started
     </p>
     </div>
</div>

    </div>
  );
};

export default WriteArticle;
