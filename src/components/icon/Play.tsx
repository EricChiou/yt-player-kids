import React, { SVGProps } from 'react';

const Play: React.FC<{
  width?: string,
  height?: string,
  className?: string,
}> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

Play.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Play;
