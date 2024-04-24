type TreeItem = {
  type: 'file' | 'directory';
  name: string;
  extra?: string;
  files?: TreeItem[];
};

function countLeadingSpaces(line: string): number {
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

    const extra = line.match(/\/\/\s*(.+)/)?.[1] ?? '';
    const name = line.trim().split(' ').slice(-1)[0];

    const nextLine = lines[i + 1] || '';
    const nextLineLevel = countLeadingSpaces(nextLine);
    const type = nextLineLevel > level ? 'directory' : 'file';
    const item: TreeItem =
      type === 'directory'
        ? { type, name, files: [], extra }
        : { type, name, extra };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(item);
    } else {
      const parentItem = stack[stack.length - 1].item;
      parentItem.files?.push(item);
    }

    if (item.type === 'directory') {
      stack.push({ level, item });
    }
  }

  return tree;
}
