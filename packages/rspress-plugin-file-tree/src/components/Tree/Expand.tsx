import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import clsx from 'clsx';

export type ShapeType = {
  width: number;
  height: number;
};

export const getRealShape = (el: HTMLElement | null): ShapeType => {
  const defaultShape: ShapeType = { width: 0, height: 0 };
  if (!el || typeof window === 'undefined') return defaultShape;

  const rect = el.getBoundingClientRect();
  const { width, height } = window.getComputedStyle(el);

  const getCSSStyleVal = (str: string, parentNum: number) => {
    if (!str) return 0;
    const strVal = str.includes('px')
      ? +str.split('px')[0]
      : str.includes('%')
        ? +str.split('%')[0] * parentNum * 0.01
        : str;

    return Number.isNaN(+strVal) ? 0 : +strVal;
  };

  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height),
  };
};

export type ShapeResult = [ShapeType, () => void];

const useRealShape = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
): ShapeResult => {
  const [state, setState] = useState<ShapeType>({
    width: 0,
    height: 0,
  });
  const update = () => {
    const { width, height } = getRealShape(ref.current);
    setState({ width, height });
  };
  useEffect(() => update(), [ref.current]);

  return [state, update];
};

export type ExpandProps = {
  isExpanded?: boolean;
  delay?: number;
};

const defaultProps = {
  isExpanded: false,
  delay: 200,
};

const Expand: React.FC<React.PropsWithChildren<ExpandProps>> = ({
  isExpanded,
  delay,
  children,
}: React.PropsWithChildren<ExpandProps> & typeof defaultProps) => {
  const [height, setHeight] = useState<string>(isExpanded ? 'auto' : '0');
  const [selfExpanded, setSelfExpanded] = useState<boolean>(isExpanded);
  const [visible, setVisible] = useState<boolean>(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const entryTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const resetTimer = useRef<number>();
  const [state, updateShape] = useRealShape<HTMLDivElement>(contentRef);

  useEffect(() => setHeight(`${state.height}px`), [state.height]);
  useEffect(() => {
    // show element or reset height.
    // force an update once manually, even if the element does not change.
    // (the height of the element might be "auto")
    if (isExpanded) {
      setVisible(isExpanded);
    } else {
      updateShape();
      setHeight(`${state.height}px`);
    }

    // show expand animation
    entryTimer.current = window.setTimeout(() => {
      setSelfExpanded(isExpanded);
      clearTimeout(entryTimer.current);
    }, 30);

    // Reset height after animation
    if (isExpanded) {
      resetTimer.current = window.setTimeout(() => {
        setHeight('auto');
        clearTimeout(resetTimer.current);
      }, delay);
    } else {
      leaveTimer.current = window.setTimeout(() => {
        setVisible(isExpanded);
        clearTimeout(leaveTimer.current);
      }, delay / 2);
    }

    return () => {
      clearTimeout(entryTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(resetTimer.current);
    };
  }, [isExpanded]);

  return (
    <div
      className={clsx('rspress-file-tree-expand-container')}
      style={{
        height: isExpanded ? height : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: `height ${delay}ms ease`,
      }}
    >
      <div
        ref={contentRef}
        className={clsx('rspress-file-tree-expand-content')}
      >
        {children}
      </div>
    </div>
  );
};

Expand.defaultProps = defaultProps;
Expand.displayName = 'GeistExpand';
export default Expand;
