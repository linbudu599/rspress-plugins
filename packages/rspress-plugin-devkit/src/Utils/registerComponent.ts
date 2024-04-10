import path from 'path';

export function getComponentName(componentPath: string): string {
  return path.basename(componentPath, '.tsx');
}
