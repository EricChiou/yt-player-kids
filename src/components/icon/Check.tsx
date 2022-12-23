import React, { SVGProps } from 'react';

const Check: React.FC<{
  width?: string,
  height?: string,
  className?: string,
}> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" fill="currentColor"></path>
    </svg>
  );
};

Check.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Check;
