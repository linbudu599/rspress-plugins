import React from 'react';
import { buildClassName } from '../presets';

export interface TreeStatusIconProps {
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
}

const defaultProps = {
  width: 12,
  height: 12,
  active: false,
};

const TreeStatusIcon: React.FC<TreeStatusIconProps> = ({
  color,
  width,
  height,
  active,
}: TreeStatusIconProps & typeof defaultProps) => {
  return (
    <svg
      className={buildClassName('folder-status-icon')}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      {!active && <path d="M12 8v8" />}
      <path d="M8 12h8" />
    </svg>
  );
};

TreeStatusIcon.defaultProps = defaultProps;
TreeStatusIcon.displayName = 'GeistTreeStatusIcon';
export default TreeStatusIcon;
