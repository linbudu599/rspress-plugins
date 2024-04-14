import React, { useMemo } from 'react';
import TreeFileIcon from './FileIcon';
import { useTreeContext } from './TreeContext';
import TreeIndents from './TreeIndents';
import { makeChildPath, stopPropagation } from '../helpers';
import { buildClassName } from '../presets';

interface Props {
  name: string;
  extra?: string;
  parentPath?: string;
  level?: number;
  className?: string;
}

const defaultProps = {
  level: 0,
  className: '',
  parentPath: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeFileProps = Props &
  NativeAttrs & {
    parentExpanded: boolean[];
  };

const TreeFile: React.FC<React.PropsWithChildren<TreeFileProps>> = ({
  name,
  parentPath,
  level,
  extra,
  className,
  parentExpanded,
  ...props
}: React.PropsWithChildren<TreeFileProps> & typeof defaultProps) => {
  const { onFileClick } = useTreeContext();
  const currentPath = useMemo(() => makeChildPath(name, parentPath), []);
  const clickHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    onFileClick && onFileClick(currentPath);
  };

  return (
    <div className={buildClassName('file')} onClick={clickHandler} {...props}>
      <div
        className={buildClassName('file-names')}
        style={{
          marginLeft: `calc(1.875rem * ${level})`,
        }}
      >
        <TreeIndents count={level} />
        <span className={buildClassName('file-icon')}>
          <TreeFileIcon />
        </span>
        <span className={buildClassName('file-name')}>
          {name}
          {extra && (
            <span className={buildClassName('file-extra')}>{extra}</span>
          )}
        </span>
      </div>
    </div>
  );
};

TreeFile.defaultProps = defaultProps;
TreeFile.displayName = 'GeistTreeFile';
export default TreeFile;
