import React, { useState } from 'react';
import { Upload, Scissors } from 'lucide-react';
import './RemoveObject.css';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
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
      if (description.split(' ').length > 1) {
        toast.error("Please enter only one word for the object to remove");
        return;
      }
      const formData = new FormData();
formData.append('image', selectedFile);
formData.append('object', description);

const token = await getToken();

const { data } = await axios.post(
  '/api/ai/remove-image-object',
  formData, // <-- send FormData directly
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Let axios set this explicitly
    },
  }
);
      if (data.success) {
        setContent(data.content);
        toast.success("Image processed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("API call failed:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="remove-object-container">
      
      {/* LEFT PANEL (Form only here) */}
      <form className="left-panel" onSubmit={handleSubmit}>
        <h3><Scissors size={18} /> Object Removal</h3>

        <div className="upload-wrapper">
          <div className="upload-input-row">
            <label className="custom-upload">
              <Upload className="upload-icon2" />
              <span className="upload-text">Choose File</span>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {selectedFile && (
              <button
                type="button"
                className="clear-file-btn"
                onClick={() => setSelectedFile(null)}
              >
                Clear
              </button>
            )}
          </div>

          <p className="file-name">
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </p>
          <p className="file-support-text">
            Supports JPG, PNG, and other image formats
          </p>
        </div>

        <label className="desc-label">Describe object to remove</label>
        <textarea
          placeholder="type only 1 word ,example: hat, bag, watch"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="desc-input"
        />

        <p className="hint">The generated image quality is depending on quality of image you upload</p>
        

        <button className="remove-btn2" type="submit" disabled={loading}>
        {
          loading ? <span className='spinner'></span> : <Scissors size={16} />
        }
         Remove Object
        </button>
      </form>

   
      <div className="right-panel">
        <h3><Scissors size={18} /> Processed Image</h3>
        {content ? (
          <img src={content} alt="Processed" className="processed-image" width={600} height={400} />
        ) : (
          <div className="placeholder">
            <Scissors size={36} color="#cbd5e1" />
            <p>Upload an image and describe what to remove</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
