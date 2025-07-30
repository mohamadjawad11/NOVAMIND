import React from 'react';
import './Testimonials.css';
import { testimonialData } from '../../assets/assets'; // Adjust path if needed

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h1 className="testimonials-heading">Testimonials</h1>

      <div className="testimonials-wrapper">
        {testimonialData.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-avatar-wrapper">
              <img src={t.image} alt={t.name} className="testimonial-avatar" />
            </div>
            <div className="testimonial-info">
              <h3>{t.name}</h3>
              <p className="title">{t.title}</p>
            </div>
            <p className="testimonial-content">{t.content}</p>
            <div className="testimonial-stars">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <span key={idx} className="star">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
