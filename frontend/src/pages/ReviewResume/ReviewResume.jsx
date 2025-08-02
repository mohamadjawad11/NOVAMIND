import React, { useState, useRef } from 'react';
import { FileText, Upload } from 'lucide-react';
import './ReviewResume.css';

const ReviewResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // used to reset input

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Reviewing:', selectedFile.name);
      // Backend call can go here
    }
  };

  return (
    <form className="review-container" onSubmit={handleSubmit}>
      <div className="review-left">
        <h3><FileText className='icon-text' size={18} /> Resume Review</h3>

        <label className="review-label">Upload Resume</label>
        <div className="review-upload-wrapper">
          <label className="review-custom-upload">
           <div className="review-upload-content">
  <Upload size={16} />
  <span>Upload</span>
</div>

            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>

          {selectedFile && (
            <button
              type="button"
              className="review-clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>

        <p className="review-file-name">{selectedFile ? selectedFile.name : 'No file chosen'}</p>
        <p className="review-file-support">Supports PDF, PNG, JPG formats</p>

        <button type="submit" className="review-btn">
          <FileText size={16} /> Review Resume
        </button>
      </div>

      <div className="review-right">
        <h3><FileText size={18} /> Analysis Results</h3>
        <div className="review-placeholder">
          <FileText size={36} color="#cbd5e1" />
          <p>Upload your resume and click "Review Resume" to get started</p>
        </div>
      </div>
    </form>
  );
};

export default ReviewResume;
