import Tree from './Tree';
import TreeFile from './TreeFile';
import TreeFolder from './TreeFolder';

import './index.less';

export type TreeComponentType = typeof Tree & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};

(Tree as TreeComponentType).File = TreeFile;
(Tree as TreeComponentType).Folder = TreeFolder;

export type { TreeProps, TreeFile } from './Tree';
export default Tree as TreeComponentType;
