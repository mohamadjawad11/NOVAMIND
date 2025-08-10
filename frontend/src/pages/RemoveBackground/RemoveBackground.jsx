import React, { useState } from 'react';
import { Delete, Eraser, Upload } from 'lucide-react';
import './RemoveBackground.css';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      const token = await getToken();
      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (data.success) {
        setContent(data.content);
        toast.success("Image processed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("API call failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="remove-bg-container">
      {/* Form only for upload section */}
      <form className="upload-section" onSubmit={handleSubmit}>
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
        <button disabled={loading} className="remove-btn" type="submit">
          {loading ? <span className='spinner'></span> : <Delete size={16} />}
          Remove background
        </button>
      </form>

{
  !content ? (
     <div className="preview-section">
      
        <h3>Processed Image</h3>
      
        <div className="placeholder">
          <Eraser className="upload-icon2" />
          <p>Upload an image and click "Remove Background" to get started</p>
        </div>
      </div>):(
        <img src={content} alt="image" className="preview-image" width={600} height={400}/>
      )
}
    
     
    </div>
  );
};

export default RemoveBackground;
