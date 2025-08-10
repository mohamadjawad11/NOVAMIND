import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src={assets.logo}
            alt="Brand Logo"
            className="footer-logo"
          />
          <p className="footer-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="footer-links-wrapper">
          <div className="footer-links">
            <h2 className="footer-title">Company</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h2 className="footer-title">Subscribe to our newsletter</h2>
            <p className="newsletter-text">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <p className="footer-bottom">
        Copyright 2024 © <a href="https://prebuiltui.com">Mohammad Jawad Hamdan</a>. All Right Reserved.
      </p>
    </footer>
  );
}
