import React, { PropsWithChildren } from 'react';

const PlainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (<>{children}</>);
};

export default PlainLayout;
