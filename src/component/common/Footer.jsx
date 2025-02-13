import React from 'react';
import '../common/style/Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2 className="footer-title">Commerce Theme</h2>
            <form className="footer-form">
              <input type="email" placeholder="Enter Your Email*" required />
              <button type="submit">Subscribe</button>
            </form>
            <p className="footer-text">Get monthly updates and free resources.</p>
          </div>
          
          <div className="footer-column">
            <h3>MOBIRISE</h3>
            <p className="mobirise-info">Phone: +84 (0) 87 7078 272</p>
            <p className="mobirise-info">Email: dacsanviet@gmail.com</p>
            <p className="mobirise-info">Address:Đại Học FPT</p>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className='fa fa-twitter'></i></a>
              <a href="#" className="social-icon"><i className='fa fa-facebook'></i></a>
              <a href="#" className="social-icon"><i className='fa fa-youtube'></i></a>
              <a href="#" className="social-icon"><i className='fa fa-instagram'></i></a>
              <a href="#" className="social-icon"><i className='fa fa-google'></i></a>
              <a href="#" className="social-icon"><i className="fa fa-behance"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>RECENT NEWS</h3>
            <ul>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>LINKS</h3>
            <ul>
              <li><a href="#">Website Builder</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;