import React, { SVGProps } from 'react';

const Back: React.FC<{
  width?: string,
  height?: string,
  className?: string,
}> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z" fill="currentColor"></path>
    </svg>
  );
};

Back.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Back;
