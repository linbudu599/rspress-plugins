import React from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { Tree } from '@geist-ui/core';

interface FileTreeRendererProps {
  struct: string;
}

const files = [
  {
    type: 'directory',
    name: 'bin',
    files: [
      {
        type: 'file',
        name: 'cs.js',
      },
    ],
  },
  {
    type: 'directory',
    name: 'docs',
    files: [
      {
        type: 'file',
        name: 'controllers.md',
      },
      {
        type: 'file',
        name: 'es6.md',
      },
      {
        type: 'file',
        name: 'production.md',
      },
      {
        type: 'file',
        name: 'views.md',
      },
    ],
  },
] as any;

const FileTreeRenderer: React.FC<
  React.PropsWithChildren<FileTreeRendererProps>
> = ({ children = '' }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Tree value={files} />
    </GeistProvider>
  );
};

export default FileTreeRenderer;
