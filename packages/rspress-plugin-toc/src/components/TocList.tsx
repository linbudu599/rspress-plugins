import React from 'react';
import { useDark } from 'rspress/runtime';

import './TocList.less';

export interface TocComponentProps extends React.PropsWithChildren {}

const Toc: React.FC<TocComponentProps> = (props) => {
  const dark = useDark();

  return (
    <div data-dark={String(dark)} className={'rp-toc-container'}>
      {props.children}
    </div>
  );
};

export default Toc;
