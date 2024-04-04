import React, { useState, useEffect } from 'react';

import { throttle } from 'radash';

import clsx from 'clsx';

import './Back2Top.less';

const presetClassName = 'rp-back-to-top';

const ScrollTopThreshold = 100;

export default function Back2Top() {
  const [show, setShow] = useState(false);

  const checkScroll = throttle(
    {
      interval: 100,
    },
    () => {
      setShow(window.scrollY > ScrollTopThreshold);
    },
  );

  useEffect(checkScroll, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div
      data-visible={String(show)}
      className={presetClassName}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M535.12 442.432v210.016a16 16 0 0 1-16 16h-16.16a16 16 0 0 1-16-16V440.208l-32.88 32.864a16 16 0 0 1-11.312 4.688h-28.304a14.464 14.464 0 0 1-10.24-24.688l97.824-97.808a11.136 11.136 0 0 1 15.744 0l97.808 97.808a14.464 14.464 0 0 1-10.24 24.688h-28.288a16 16 0 0 1-11.312-4.688l-30.64-30.64zM512 800c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          fill="#fff"
          p-id="4236"
        ></path>
      </svg>
    </div>
  );
}
