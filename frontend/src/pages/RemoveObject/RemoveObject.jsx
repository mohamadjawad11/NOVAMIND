import React, { useState } from 'react';
import { Upload, Scissors } from 'lucide-react';
import './RemoveObject.css';

const RemoveObject = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && description.trim()) {
      console.log('File:', selectedFile.name);
      console.log('Description:', description);
    }
  };

  return (
    <form className="remove-object-container" onSubmit={handleSubmit}>
      <div className="left-panel">
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
        className="clear-file-btn" // NEW
        onClick={() => setSelectedFile(null)} // NEW
      >
        Clear
      </button>
    )}
  </div>

  <p className="file-name">{selectedFile ? selectedFile.name : 'No file chosen'}</p>
  <p className="file-support-text">Supports JPG, PNG, and other image formats</p>
</div>


        <label className="desc-label">Describe object to remove</label>
        <textarea
          placeholder="e.g., car in background, tree from the image"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='desc-input'
        />

        <p className="hint">Be specific about what you want to remove</p>

        <button className="remove-btn2" type="submit">
          <Scissors size={16} /> Remove object
        </button>
      </div>

      <div className="right-panel">
        <h3><Scissors size={18} /> Processed Image</h3>
        <div className="placeholder">
          <Scissors size={36} color="#cbd5e1" />
          <p>Upload an image and describe what to remove</p>
        </div>
      </div>
    </form>
  );
};

export default RemoveObject;
