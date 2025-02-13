import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Success.css";

const Success = () => {

  return (
    <div className="page-container1">
      
      <main className="main-content1">
        <div className="payment-confirmation1">
          <div className="icon-container1">
            <svg className="icon1" viewBox="0 0 24 24">
              <path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h2 className="title1">Payment Done!</h2>
          <p className="message1">
            Thank you for completing your secure online payment.
          </p>
          <p className="message1">Have a great day!</p>
          <div className="button-container1">
            <Link className="button" to="/">
              BACK HOME
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;