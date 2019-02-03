import React from 'react';

export interface CardDto {
  title: string;
  text: string;
  imageUrl?: string;
}

const imgStyle = {
  maxWidth: '240px'
};

const Card: React.SFC<CardDto> = ({ title, text, imageUrl }) => (
  <div className="card border-0">
    {imageUrl && (
      <div className="mx-auto">
        <img src={imageUrl} className="card-img-top" style={imgStyle} />
      </div>
    )}
    <div className="card-body px-0">
      <h5 className="card-title text-primary text-center">{title}</h5>
      <div className="card-text">{text}</div>
    </div>
  </div>
);

export default Card;
