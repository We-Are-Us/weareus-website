import React from 'react';

const responseStyle = {
  display: 'none'
};

class Newsletter extends React.Component<{}, {}> {
  private input: React.RefObject<{}>;
  private offscreenInput: React.RefObject<{}>;

  constructor(props: {}) {
    super(props);

    this.input = React.createRef();
    this.offscreenInput = React.createRef();
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid py-5">
        <div className="container my-3 my-md-5">
          <div id="mc_embed_signup">
            <form
              action="https://weareus.us19.list-manage.com/subscribe/post?u=9c683cb890bd1f8bc286513b6&amp;id=cadded2420"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <h2 className="h5 text-primary text-center">
                  Sign up for We are Us news and special offers.
                </h2>
                <div className="mc-field-group">
                  <input
                    ref={this.input}
                    type="email"
                    name="EMAIL"
                    placeholder="Enter your email"
                    className="required email form-control"
                    id="mce-EMAIL"
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={responseStyle}
                  />
                  <div
                    className="response"
                    id="mce-success-response"
                    style={responseStyle}
                  />
                </div>
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                <div className="sr-only" aria-hidden="true">
                  <input
                    ref={this.offscreenInput}
                    type="text"
                    name="b_9c683cb890bd1f8bc286513b6_cadded2420"
                  />
                </div>
                <div className="clear">
                  <button
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;
