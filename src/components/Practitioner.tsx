import React from 'react';
// FIXME: write types
import BlockImage from 'react-block-image';

interface Text {
  type: 'paragraph';
  spans: Array<any>;
  text: string;
}

interface PractitionerProps {
  id: string;
  heroImageUrl: string;
  logoImageUrl: string;
  name: string;
  about: Array<string>;
}

const imageStyle = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  height: '60vh',
  width: '100vw',
  zIndex: -1
};

const Practitioner: React.SFC<PractitionerProps> = props => (
  <>
    <div
      className="container-fluid px-0 mx-0"
      style={{ minHeight: imageStyle.height }}
    >
      <BlockImage
        style={imageStyle}
        backgroundSize="cover"
        src={props.heroImageUrl}
      />
    </div>
    <div className="container mt-4">
      <img src={props.logoImageUrl} className="float-right" />
      <h2 className="h2 text-primary">{props.name}</h2>
      <h3 className="h3">About</h3>
      {props.about.map(about => (
        <p>{about}</p>
      ))}
    </div>
  </>
);

export default Practitioner;
