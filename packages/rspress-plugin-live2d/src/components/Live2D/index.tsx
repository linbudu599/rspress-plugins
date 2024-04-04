import React, { useEffect } from 'react';

import { loadOml2d } from 'oh-my-live2d';

import './index.less';

export default function Live2DWidget() {
  useEffect(() => {
    loadOml2d({
      models: [
        {
          path: 'https://model.oml2d.com/HK416-1-normal/model.json',
          position: [0, 60],
          scale: 0.08,
          stageStyle: {
            height: 450,
          },
        },
      ],
    });
  }, []);

  return <div>Live2D</div>;
}
