import React from "react";

function HomeTitle() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="support-wrap mb-3 text-center">
            <div className="support-icon mb-2">
              <img
                className="animated"
                src={process.env.PUBLIC_URL + `assets/images/common/support-1.png`}
                alt=""
              />
            </div>
            <div className="support-content">
              <h5>Free Shipping</h5>
              <p>Free shipping on all orders</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="support-wrap mb-3 text-center">
            <div className="support-icon mb-2">
              <img
                className="animated"
                src={process.env.PUBLIC_URL + `assets/images/common/support-2.png`}
                alt=""
              />
            </div>
            <div className="support-content">
              <h5>Support 24/7</h5>
              <p>Contact us anytime</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="support-wrap mb-3 text-center">
            <div className="support-icon mb-2">
              <img
                className="animated"
                src={process.env.PUBLIC_URL + `assets/images/common/support-3.png`}
                alt=""
              />
            </div>
            <div className="support-content">
              <h5>Money Return</h5>
              <p>30 days money back guarantee</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="support-wrap mb-3 text-center">
            <div className="support-icon mb-2">
              <img
                className="animated"
                src={process.env.PUBLIC_URL + `assets/images/common/support-4.png`}
                alt=""
              />
            </div>
            <div className="support-content">
              <h5>Order Discount</h5>
              <p>Discount on bulk orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTitle;
