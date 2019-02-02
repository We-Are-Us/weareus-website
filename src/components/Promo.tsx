import React from 'react';
// FIXME: write types
import BlockImage from 'react-block-image';

export interface PromoDto {
  title: string;
  secondaryTitle?: string;
  text: string;
  backgroundImage?: string;
}

interface PromoProps extends PromoDto {}

const containerStyle = {
  height: '240px'
};

const imageStyle = {
  position: 'absolute',
  height: '240px',
  width: '100%',
  zIndex: -1
};

const Promo: React.SFC<PromoProps> = ({
  title,
  secondaryTitle,
  text,
  backgroundImage
}) => (
  <div
    className="container-fluid mx-0 bg-dark text-white"
    style={containerStyle}
  >
    <BlockImage
      backgroundSize="cover"
      src={backgroundImage}
      style={imageStyle}
    />
    <h3 className="h3">{title}</h3>
    {secondaryTitle && <div>{secondaryTitle}</div>}
    {text}
  </div>
);

export default Promo;
