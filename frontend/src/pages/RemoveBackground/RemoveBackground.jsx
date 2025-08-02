import React, { useState } from 'react';
import { Delete, Eraser, Upload } from 'lucide-react';
import './RemoveBackground.css';

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Submitting file:', selectedFile.name);
    }
  };

  return (
    <form className="remove-bg-container" onSubmit={handleSubmit}>
      <div className="upload-section">
        <h3>Background Removal</h3>
        <div className="file-upload-wrapper">
          <label className="custom-upload">
            <Upload className="upload-icon" />
            <span className="upload-text">Choose File</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
        <p className="file-name">{selectedFile ? selectedFile.name : 'No file chosen'}</p>
        <p className="file-support-text">Supports JPG, PNG, and other image formats</p>
        <button className="remove-btn" type="submit">Remove background</button>
      </div>

      <div className="preview-section">
      
        <h3>Processed Image</h3>
        <div className="placeholder">
          <Eraser className="upload-icon2" />
          <p>Upload an image and click "Remove Background" to get started</p>
        </div>
      </div>
    </form>
  );
};

export default RemoveBackground;
