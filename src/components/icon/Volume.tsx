import React, { SVGProps } from 'react';

const Pause: React.FC<{
  width?: string,
  height?: string,
  className?: string,
}> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1
        .45-1 1z"
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
