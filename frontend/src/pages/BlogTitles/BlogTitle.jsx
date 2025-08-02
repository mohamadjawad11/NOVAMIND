import React, { useState } from 'react';
import './BlogTitles.css';

const BlogTitle = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'];

  return (
    <div className="blog-title-container">
      <div className="left-box">
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
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="generate-btn2"># Generate title</button>
      </div>

      <div className="right-box">
        <h3># Generated titles</h3>
        <div className="placeholder">
          <div className="hash-icon">#</div>
          <p>Enter keywords and click "Generate Titles" to get started</p>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;
