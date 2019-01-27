import React from 'react';
// FIXME: write types
import BlockImage from 'react-block-image';

export interface PromoDto {
  title: string;
  secondaryTitle?: string;
  text: string;
  backgroundImageId: string;
}

interface PromoProps extends PromoDto {
  backgroundImage?: string;
}

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
  backgroundImageId,
  backgroundImage
}) => (
  <div className="container container-fluid mx-0" style={containerStyle}>
    <BlockImage
      backgroundSize="cover"
      src={backgroundImage}
      style={imageStyle}
    />
    <h3 className="h3">{title}</h3>
  </div>
);

export default Promo;
