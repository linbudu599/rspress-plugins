import React, { useEffect, useMemo, useState } from 'react';
import TreeFile from './TreeFile';
import Expand from './Expand';
import TreeIndents from './TreeIndents';
import { useTreeContext } from './TreeContext';
import TreeFolderIcon from './TreeFolderIcon';
import TreeStatusIcon from './TreeStatusIcon';
import {
  sortChildren,
  makeChildPath,
  stopPropagation,
  setChildrenProps,
} from '../helpers';
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
export type TreeFolderProps = Props &
  NativeAttrs & {
    parentExpanded: boolean[];
  };

const TreeFolder: React.FC<React.PropsWithChildren<TreeFolderProps>> = ({
  name,
  children,
  parentPath,
  level: parentLevel,
  extra,
  className,
  parentExpanded = [],
  ...props
}: React.PropsWithChildren<TreeFolderProps> & typeof defaultProps) => {
  const { initialExpand, isImperative } = useTreeContext();
  const [expanded, setExpanded] = useState<boolean>(initialExpand);
  useEffect(() => setExpanded(initialExpand), []);

  const currentPath = useMemo(() => makeChildPath(name, parentPath), []);
  const clickHandler = () => setExpanded(!expanded);

  const nextChildren = setChildrenProps(
    children,
    {
      parentPath: currentPath,
      level: parentLevel + 1,
      parentExpanded: [...parentExpanded, expanded],
    },
    [TreeFolder, TreeFile],
  );

  const sortedChildren = isImperative
    ? nextChildren
    : sortChildren(nextChildren, TreeFolder);

  return (
    <div className={buildClassName('folder')} onClick={clickHandler} {...props}>
      <div
        className={buildClassName('folder-names')}
        style={{
          marginLeft: `calc(1.875rem * ${parentLevel})`,
        }}
      >
        <TreeIndents count={parentLevel} />
        <span className={buildClassName('folder-status')}>
          <TreeStatusIcon active={expanded} />
        </span>
        <span className={buildClassName('folder-icon')}>
          <TreeFolderIcon />
        </span>
        <span className={buildClassName('folder-name')}>
          {name}
          {extra && (
            <span className={buildClassName('folder-extra')}>{extra}</span>
          )}
        </span>
      </div>
      <Expand isExpanded={expanded} parentExpanded={parentExpanded}>
        <div
          className={buildClassName('folder-content')}
          onClick={stopPropagation}
        >
          {sortedChildren}
        </div>
      </Expand>
    </div>
  );
};

TreeFolder.defaultProps = defaultProps;
TreeFolder.displayName = 'GeistTreeFolder';
export default TreeFolder;
