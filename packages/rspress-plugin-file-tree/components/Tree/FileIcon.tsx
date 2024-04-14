import React from 'react';
import { buildClassName } from '../presets';

export interface TreeFileIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const defaultProps = {
  width: 22,
  height: 22,
};

const TreeFileIcon: React.FC<TreeFileIconProps> = ({
  color,
  width,
  height,
}: TreeFileIconProps & typeof defaultProps) => {
  return (
    <svg
      className={buildClassName('file-icon')}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M13 2v7h7" />
    </svg>
  );
};

TreeFileIcon.defaultProps = defaultProps;
TreeFileIcon.displayName = 'GeistTreeFileIcon';
export default TreeFileIcon;
