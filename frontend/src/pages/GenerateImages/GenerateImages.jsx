import React, { useState } from 'react';
import './GenerateImages.css';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { Image } from 'lucide-react';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();
  


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const prompt = `Generate an image of ${description} in the ${selectedStyle} style`;
      const token = await getToken();
      const {data} = await axios.post('/api/ai/generate-image', { prompt }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if(data.success){
        setContent(data.content);
        toast.success("Image generated successfully!");
      }else{
        toast.error(data.message);
      }
      
    }catch(error){
      toast.error(error?.response?.data?.message || error.message);
      console.error("API call failed:", error.message);
    }
    setLoading(false);
  };

  

  return (
    <div className="generate-images-container">
      <form className="left-box" onSubmit={handleSubmit}>
        <h3>🖼️ AI Image Generator</h3>

        <strong>Describe Your Image</strong>
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


        <button disabled={loading} type="submit" className="generate-image-btn">
        {loading ? <span className='spinner'></span> :<Image size={16} />}
           Generate image
        </button>
      </form>

      {
        !content ? (
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
      </div>):(
        <div className="right-box generated-image-wrapper"> <img src={content} alt='image'/> </div>
      )
      }

      
    </div>
  );
};

export default GenerateImages;
