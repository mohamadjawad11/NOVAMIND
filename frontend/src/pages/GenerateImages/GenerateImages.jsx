import React, { useState } from 'react';
import './GenerateImages.css';

const GenerateImages = () => {
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to generate image
    console.log('Generate with:', { description, selectedStyle });
  };

  const [publish, setPublish] = useState(false);

  return (
    <div className="generate-images-container">
      <form className="left-box" onSubmit={handleSubmit}>
        <h3>🖼️ AI Image Generator</h3>

        <label>Describe Your Image</label>
        <textarea
          placeholder="Describe what you want to see in the image.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Style</label>
        <div className="style-buttons">
          {['Realistic', 'Ghibli Style','Anime Style','Cartoon Style',
          'Fantasy Style','Realistic Style','3D Style','Portrait Style']
          .map((style) => (
            <span
              type="button"
              key={style}
              className={selectedStyle === style ? 'active' : ''}
              onClick={() => setSelectedStyle(style)}
            >
              {style}
            </span>
          ))}
        </div>

       <div className="toggle-container">
  <label className="toggle-wrapper">
    <input
      type="checkbox"
      onChange={(e) => setPublish(e.target.checked)}
      checked={publish}
      className="toggle-input"
    />
    <div className="toggle-track"></div>
    <span className="toggle-thumb"></span>
  </label>
  <p className="toggle-text">Make this image public</p>
</div>


        <button type="submit" className="generate-image-btn">
          <span role="img" aria-label="icon">🖼️</span> Generate image
        </button>
      </form>

      <div className="right-box">
        <h3>🖼️ Generated image</h3>
        <div className="placeholder">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
            alt="Placeholder"
            className="placeholder-icon"
          />
          <p>Describe an image and click "Generate Image" to get started</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
