import React, { useState, useRef } from 'react';
import { FileText, Upload } from 'lucide-react';
import './ReviewResume.css';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // used to reset input
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!selectedFile) {
        toast.error("Please upload a resume");
        return;
      }
      const formData = new FormData();
      formData.append('resume', selectedFile);
      const token = await getToken();
      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (data.success) {
        setContent(data.content);
        toast.success("Resume reviewed successfully!");
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("API call failed:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="review-container">
      {/* Form wraps only the left panel */}
      <form className="review-left" onSubmit={handleSubmit}>
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

        <button type="submit" className="review-btn" disabled={loading}>
          {loading ? <span className='spinner'></span> : <FileText size={16} />}
          Review Resume
        </button>
      </form>

      {/* Right panel OUTSIDE the form */}
      <div className="review-right">
        <h3><FileText size={18} /> Analysis Results</h3>
        {content ? (
          <div className="review-results">
            <div className='reset'><ReactMarkdown>{content}</ReactMarkdown> </div>
          </div>
        ) : (
          <div className="review-placeholder">
            <FileText size={36} color="#cbd5e1" />
            <p>Upload your resume and click "Review Resume" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
