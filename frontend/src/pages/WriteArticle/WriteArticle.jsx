import React, { useState } from 'react';
import './WriteArticle.css';
import { Copy, Edit, FileText, PenTool } from 'lucide-react';
import axios from 'axios';
import {useAuth} from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const WriteArticle = () => {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('');
  const [loading, setLoading] = useState(false);
  const [content,setContent] = useState('');
  const {getToken}=useAuth();

  const handleLengthClick = (value) => {
    setLength(value);
  };



  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (!length) {
  toast.error("Please select an article length.");
  setLoading(false);
  return;
}

    try{
      setLoading(true);
      const prompt=`Write an article about ${topic} in ${length} length`;
      const token = await getToken();
      const {data}=await axios.post('/api/ai/generate-article',{prompt,length},{
        headers:{
          
          'Authorization':`Bearer ${token}`,
        }
      });
      if(data.success){
        setContent(data.content);
      }else{
        toast.error(data.message);
      }
    }catch(error){
    
    toast.error(error?.response?.data?.message || error.message);
    console.log(error.message)

    }
    setLoading(false);
  }

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
            onClick={() => handleLengthClick('medium')}
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

        <button disabled={loading} type="submit" className="generate-btn">
        {loading ? <span className='spinner'></span>:<FileText size={16} />}
            Generate Article
        </button>
      </form>

      {!content ? (
        
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
      ) : (<div className="custom-container-special">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
)}


    </div>
  );
};

export default WriteArticle;
