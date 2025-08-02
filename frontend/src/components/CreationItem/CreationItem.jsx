import React from 'react';
import './CreationItem.css';
import { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {

  const [expanded, setExpanded] = useState(false);


  return (
    <div onClick={() => setExpanded(!expanded)} className="creation-item">
      <div className="creation-item-content">
        <div className="text-section">
          <h2>{item.prompt}</h2>
          <p className="creation-item-date">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="creation-item-button">{item.type}</button>
      </div>
     {
  expanded && (
    <div className="expanded-wrapper">
      {item.type === 'image' ? (
        <div className="image-wrapper">
          <img src={item.content} alt="image" className="expanded-image" />
        </div>
      ) : (
        <div className="text-wrapper">
          <div className="text-content">
            <Markdown>
              {item.content}
            </Markdown>
          </div>
        </div>
      )}
    </div>
  )
}

    </div>
  );
};

export default CreationItem;
