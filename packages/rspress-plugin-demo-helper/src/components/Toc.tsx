import React, { useState, useEffect } from 'react';
import { useDark, useLang } from 'rspress/runtime';

import './Toc.less';

const presetClassName = 'rp-toc';

export interface TocComponentProps extends React.PropsWithChildren {}

const Toc: React.FC<TocComponentProps> = (props) => {
  return (
    <div>
      TOC Components
      {props.children}
    </div>
  );
};

export default Toc;
