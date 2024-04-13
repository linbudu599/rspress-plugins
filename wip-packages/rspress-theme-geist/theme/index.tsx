import React from 'react';

import { usePageData, Content } from 'rspress/runtime';

function Layout() {
  return (
    <div>
      Custom Theme Layout
      <Content />
    </div>
  );
}

const setup = () => {};

export default { Layout, setup };
