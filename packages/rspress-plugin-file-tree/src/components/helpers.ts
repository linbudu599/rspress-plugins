import React, { ReactNode } from 'react';

export const sortChildren = (
  children: ReactNode | undefined,
  folderComponentType: React.ElementType,
) => {
  return React.Children.toArray(children).sort((a, b) => {
    if (!React.isValidElement(a) || !React.isValidElement(b)) return 0;
    if (a.type !== b.type) return a.type !== folderComponentType ? 1 : -1;
    return `${a.props.name}`.charCodeAt(0) - `${b.props.name}`.charCodeAt(0);
  });
};

export const makeChildPath = (name: string, parentPath?: string) => {
  if (!parentPath) return name;
  return `${parentPath}/${name}`;
};

export const stopPropagation = (event: React.MouseEvent) => {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

export const setChildrenProps = (
  children: ReactNode | undefined,
  props: Record<string, unknown>,
  targetComponents: Array<React.ElementType> = [],
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return [];
  const allowAll = targetComponents.length === 0;
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props);

  return React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item;
    if (allowAll) return clone(item, props);

    const isAllowed = targetComponents.find((child) => child === item.type);
    if (isAllowed) return clone(item, props);
    return item;
  });
};
