import React from 'react';

import { useLocation } from 'rspress/runtime';

export default () => {
  const location = useLocation();

  React.useEffect(() => {
    setTimeout(() => {
      window.gtag(
        'set',
        'page_path',
        location.pathname + location.search + location.hash,
      );
      window.gtag('event', 'page_view');
    });
  }, [location.pathname]);

  return null;
};
