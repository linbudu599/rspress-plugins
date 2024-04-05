import React from 'react';
import { Provider } from 'react-redux';
import { Playground, store } from 'graphql-playground-react';

const GraphQLPlayground: React.FC = () => {
  return (
    <h1>
      GraphQL Playground
      <Provider store={store}>
        <Playground endpoint="https://api.graph.cool/simple/v1/swapi" />
      </Provider>
    </h1>
  );
};

export default GraphQLPlayground;
