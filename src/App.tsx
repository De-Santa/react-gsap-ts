import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
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
      {routes.map(({path, name, Component}) => (
        <Route exact id={name} key={path} path={path}>
          {(props:RouteComponentProps<any>) => <Component {...props} />}
        </Route>
      ))}
    </ShowcaseProvider>
  )
};
