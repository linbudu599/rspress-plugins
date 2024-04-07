import React, { useState, useEffect } from 'react';
import { useDark } from 'rspress/runtime';

import { throttle } from 'throttle-debounce';

import './Back2Top.less';

const presetClassName = 'rp-back-to-top';

const ScrollTopThreshold = 300;

const useEventListener = (
  eventName: keyof HTMLElementEventMap,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
};

export interface Back2TopProps {
  threshold?: number;
}

const Back2Top: React.FC<Back2TopProps> = ({
  threshold = ScrollTopThreshold,
}) => {
  const dark = useDark();

  const [show, setShow] = useState(false);

  const checkScroll = throttle(100, () => {
    setShow(window.scrollY > threshold);
  });

  const firstCheck = () => setTimeout(checkScroll, 0);

  useEventListener('load', firstCheck);
  useEventListener('scroll', checkScroll);

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      data-visible={String(show)}
      data-dark={String(dark)}
      className={presetClassName}
      onClick={resetScroll}
      aria-label="Back to top"
      role="button"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.0083 14.1006V42.0001"
          stroke={dark ? '#fff' : '#213547'}
          stroke-width={dark ? '3' : '2'}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 26L24 14L36 26"
          stroke={dark ? '#fff' : '#213547'}
          stroke-width={dark ? '3' : '2'}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 6H36"
          stroke={dark ? '#fff' : '#213547'}
          stroke-width={dark ? '3' : '2'}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Back2Top;
