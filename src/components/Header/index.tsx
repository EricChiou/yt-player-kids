import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import Routes from '@/constants/routes';
import Query from '@/constants/query';
import Search from '@/icon/Search';
import Lock from '@/icon/Lock';
import Icon from '@/icon/Icon';

import styles from './index.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  useEffect(() => { setKeyword(searchParams.get(Query.KEYWORD) ?? ''); }, [location]);

  function onKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') { search(); }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function search() {
    if (!keyword) { return; }
    if (location.pathname === Routes.SEARCH) {
      setSearchParams({ [Query.KEYWORD]: keyword });
    } else {
      navigate({ pathname: Routes.SEARCH, search: `?${Query.KEYWORD}=${encodeURIComponent(keyword)}` });
    }
  }

  return (<>
    <div className="relative p-2 h-full text-center shadow">
      <div className="absolute top-0 left-0 p-2 h-full">
        <div className="inline-block h-full align-middle"></div>
        <div className="inline-block p-1 align-middle cursor-pointer zoom-in-2" onClick={() => navigate(Routes.HOME)}>
          <Icon className="text-red md:w-8 md:h-8 lg:w-12 lg:h-12"></Icon>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2 h-full">
        <div className="inline-block h-full align-middle"></div>
        <div
          className="inline-block p-1 align-middle cursor-pointer zoom-in-2"
          onClick={() => navigate(Routes.SETTING)}
        >
          <Lock></Lock>
        </div>
      </div>
      <div className={`${styles.searchContainer} zoom-in-1`} onKeyUp={(e) => onKeyUp(e)}>
        <input className={`${styles.input} text-black bg-gray`} value={keyword} onChange={onChange}></input>
        <button className={`${styles.search} text-white bg-red`} onClick={search}>
          <Search className="mr-1 zoom-in-2" width="2rem" height="2rem"></Search>
        </button>
      </div>
    </div>
  </>);
};

export default Header;
