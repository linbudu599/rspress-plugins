import React from 'react';
import { useDark } from 'rspress/runtime';

import './TocList.less';

export interface TocComponentProps extends React.PropsWithChildren {}

const Toc: React.FC<TocComponentProps> = (props) => {
  const dark = useDark();

  return (
    <div
      className={`rp-toc-container ${
        dark ? 'rp-toc-container-dark' : 'rp-toc-container-light'
      }`}
    >
      {props.children}
    </div>
  );
};

export default Toc;
