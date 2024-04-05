import React from 'react';

interface DirectiveComponentsRender extends React.PropsWithChildren {}

const Fallback: React.FC<DirectiveComponentsRender> = (props) => {
  console.log('props: ', props);

  return <h1></h1>;
};

export default Fallback;
