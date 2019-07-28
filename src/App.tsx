import React from 'react';
import { Route } from 'react-router-dom';
import { ShowcaseProvider } from './context/ShowcaseContext'
import { Showcase } from './routes/Showcase';
import { Product } from './routes/Product';

const routes = [
  { path: "/", name: "Showcase", Component: Showcase },
  { path: "/product/:id", name: "Product", Component: Product }
];

export const App: React.FC = () => {
  return (
    <ShowcaseProvider>
      {routes.map(({path, Component}) => (
        <Route exact key={path} path={path}>
          {({match}) => <Component match={match} />}
        </Route>
      ))}
    </ShowcaseProvider>
  )
};
