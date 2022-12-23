import React, { SVGProps } from 'react';

const Pause: React.FC<{
  width?: string,
  height?: string,
  className?: string,
}> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9
        2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

Pause.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Pause;
