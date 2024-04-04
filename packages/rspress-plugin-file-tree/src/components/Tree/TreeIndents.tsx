import React from 'react';
import { buildClassName } from '../presets';

interface Props {
  count: number;
}

const TreeIndents: React.FC<Props> = ({ count }) => {
  if (count === 0) return null;

  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <span
          className={buildClassName('indent')}
          key={`indent-${index}`}
        ></span>
      ))}
    </>
  );
};

export default TreeIndents;
