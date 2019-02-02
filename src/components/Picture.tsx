import React from 'react';
import ResponsiveImageSet, { Breakpoint } from '../content/ResponsiveImageSet';

interface PictureProps {
  imageSet: ResponsiveImageSet;
}

const Picture: React.SFC<PictureProps> = ({ imageSet }) => {
  const { xl, lg, md } = imageSet;

  return (
    <picture>
      {xl && (
        <source
          srcSet={imageSet.getImageForBreakpoint(Breakpoint.xl)}
          media="(min-width: 1200px)"
        />
      )}
      {lg && (
        <source
          srcSet={imageSet.getImageForBreakpoint(Breakpoint.lg)}
          media="(min-width: 992px)"
        />
      )}
      {md && (
        <source
          srcSet={imageSet.getImageForBreakpoint(Breakpoint.md)}
          media="(min-width: 768px)"
        />
      )}
      <img src={imageSet.getImageForBreakpoint(Breakpoint.sm)} />
    </picture>
  );
};

export default Picture;
