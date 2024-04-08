import React, { useMemo } from 'react';
import TreeFile from './TreeFile';
import TreeFolder from './TreeFolder';
import { TreeContext } from './TreeContext';
import { sortChildren } from '../helpers';
import { buildClassName } from '../presets';

export const tuple = <T extends string[]>(...args: T) => args;

const FileTreeValueType = tuple('directory', 'file');

const directoryType = FileTreeValueType[0];

export type TreeFile = {
  type: (typeof FileTreeValueType)[number];
  name: string;
  extra?: string;
  files?: Array<TreeFile>;
};

interface Props {
  tree?: TreeFile[];
  initialExpand?: boolean;
  onClick?: (path: string) => void;
  className?: string;
}

const defaultProps = {
  initialExpand: false,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeProps = Props & NativeAttrs;

const makeChildren = (value: Array<TreeFile> = []) => {
  if (!value || !value.length) return null;
  return value
    .sort((a, b) => {
      if (a.type !== b.type) return a.type !== directoryType ? 1 : -1;

      return `${a.name}`.charCodeAt(0) - `${b.name}`.charCodeAt(0);
    })
    .map((item, index) => {
      if (item.type === directoryType)
        return (
          <TreeFolder
            name={item.name}
            extra={item.extra}
            key={`folder-${item.name}-${index}`}
          >
            {makeChildren(item.files)}
          </TreeFolder>
        );
      return (
        <TreeFile
          name={item.name}
          extra={item.extra}
          key={`file-${item.name}-${index}`}
        />
      );
    });
};

const Tree: React.FC<React.PropsWithChildren<TreeProps>> = ({
  children,
  onClick,
  initialExpand,
  tree,
  className,
  ...props
}: React.PropsWithChildren<TreeProps> & typeof defaultProps) => {
  console.log('04-08 props: ', props);
  if (!tree) return null;

  const isImperative = Boolean(tree.length > 0);
  const onFileClick = (path: string) => {
    onClick && onClick(path);
  };

  const initialValue = useMemo(
    () => ({
      onFileClick,
      initialExpand,
      isImperative,
    }),
    [initialExpand],
  );

  const customChildren = isImperative
    ? makeChildren(tree)
    : sortChildren(children, TreeFolder);

  return (
    <TreeContext.Provider value={initialValue}>
      <div className={buildClassName()} {...props}>
        {customChildren}
      </div>
    </TreeContext.Provider>
  );
};

Tree.defaultProps = defaultProps;
Tree.displayName = 'GeistTree';
export default Tree;
