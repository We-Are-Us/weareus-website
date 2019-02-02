import React from 'react';

const Newsletter: React.SFC<{}> = () => (
  <div className="jumbotron jumbotron-fluid py-5">
    <div className="container my-3 my-md-5">
      <div className="row">
        <div className="col-12 col-lg-6">
          <label
            htmlFor="newsletter-email"
            className="h5 text-primary text-center py-1 d-block"
          >
            Sign up for We are Us news
            <span className="d-md-none"> &amp; </span>
            <span className="d-none d-md-inline"> and </span>
            special offers.
          </label>
        </div>
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              id="newsletter-email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;
