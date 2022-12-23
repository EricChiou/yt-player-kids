import React, { useLayoutEffect, PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import System from '@/store/system';
import Routes from '@/constants/routes';

const BeforeEach: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const system = System.Get();
    if (system.lock && location.pathname !== Routes.SETTING) { navigate(Routes.SETTING); }
  }, []);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (location.pathname === Routes.SETTING) { return; }

      const system = System.Get();
      if (!system.lock && system.timer === -1) { return; }
      if (system.timer > 0) {
        switch (system.timer) {
          case 900:
            console.log('只剩 15 分鐘囉');
            break;
          case 600:
            console.log('只剩 10 分鐘囉');
            break;
          case 300:
            console.log('只剩 5 分鐘囉');
            break;
          case 180:
            console.log('只剩 3 分鐘囉');
            break;
          case 60:
            console.log('只剩 1 分鐘囉');
            break;
        }
        System.SetTimer(system.timer - 1);
      } else {
        System.SetTimer(0);
        System.SetLock(true);
        navigate(Routes.SETTING);
      }
    }, 1000);

    return () => clearInterval(countDown);
  }, []);

  return (<>{children}</>);
};

export default BeforeEach;
