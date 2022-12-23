import React, { PropsWithChildren } from 'react';

import Header from '@/components/Header';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (<>
    <div className="h-24">
      <Header></Header>
    </div>
    <div className="h-[calc(100vh-6rem)] overflow-hidden">
      {children}
    </div>
  </>);
};

export default MainLayout;
