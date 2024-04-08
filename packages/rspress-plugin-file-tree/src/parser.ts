type TreeItem = {
  type: 'file' | 'directory';
  name: string;
  files?: TreeItem[];
};

function countLeadingSpaces(line: string): number {
  // 根据实际情况可能需要对该正则表达式进行调整
  const matches = line.match(/^(\s*\│\s*)*/);
  if (!matches) return 0;
  return matches[0].length;
}

export function parseInput(input: string): TreeItem[] {
  const lines = input.split('\n').filter((line) => line.trim());
  const tree: TreeItem[] = [];
  const stack: { level: number; item: TreeItem }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === '.') continue;

    const level = countLeadingSpaces(line);

    // 去除行前标记"├── "以获得名称
    const name = line.trim().split(' ').slice(-1)[0];

    // 通过查看下一行来决定当前行是否是目录
    const nextLine = lines[i + 1] || '';
    const nextLineLevel = countLeadingSpaces(nextLine);
    const type = nextLineLevel > level ? 'directory' : 'file';
    const item: TreeItem =
      type === 'directory' ? { type, name, files: [] } : { type, name };

    // 移除堆栈中所有更深层级的目录
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(item);
    } else {
      // 将项目添加到最近的目录项目
      const parentItem = stack[stack.length - 1].item;
      parentItem.files?.push(item);
    }

    if (item.type === 'directory') {
      stack.push({ level, item });
    }
  }

  return tree;
}
