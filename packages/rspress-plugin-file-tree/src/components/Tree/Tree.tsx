import React, { useMemo } from 'react';
import TreeFile from './TreeFile';
import TreeFolder from './TreeFolder';
import { TreeContext } from './TreeContext';
import { sortChildren } from '../helpers';
import { buildClassName } from '../presets';
import { useDark } from 'rspress/runtime';

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
  initialExpandDepth?: number;
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
            parentExpanded={[]}
          >
            {makeChildren(item.files)}
          </TreeFolder>
        );
      return (
        <TreeFile
          name={item.name}
          extra={item.extra}
          key={`file-${item.name}-${index}`}
          parentExpanded={[]}
        />
      );
    });
};

const Tree: React.FC<React.PropsWithChildren<TreeProps>> = ({
  children,
  onClick,
  initialExpand,
  initialExpandDepth,
  tree,
  className,
  ...props
}: React.PropsWithChildren<TreeProps> & typeof defaultProps) => {
  if (!tree) return null;

  const isImperative = Boolean(tree.length > 0);
  const onFileClick = (path: string) => {
    onClick && onClick(path);
  };

  const initialValue = useMemo(
    () => ({
      onFileClick,
      initialExpand,
      initialExpandDepth,
      isImperative,
    }),
    [initialExpand],
  );

  const customChildren = isImperative
    ? makeChildren(tree)
    : sortChildren(children, TreeFolder);

  const dark = useDark();

  return (
    <TreeContext.Provider value={initialValue}>
      <div data-dark={String(dark)} className={buildClassName()} {...props}>
        {customChildren}
      </div>
    </TreeContext.Provider>
  );
};

Tree.defaultProps = defaultProps;
Tree.displayName = 'GeistTree';
export default Tree;
