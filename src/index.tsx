import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import { ShowcaseContext, ShowcaseProvider } from './context/ShowcaseContext'
import { Showcase } from './routes/Showcase';
import { Product } from './routes/Product';
import {
  enterDefault,
  exitDefault,
  enterProduct,
  exitProduct,
  enterShowcase,
  exitShowcase,
} from './route_transitions';
import 'normalize.css';
import './styles/initial.scss';
import * as serviceWorker from './serviceWorker';

const routes = [
  { path: "/", name: "Showcase", Component: Showcase },
  { path: "/product/:id", name: "Product", Component: Product }
];

ReactDOM.render(
  <BrowserRouter>
    <ShowcaseProvider>
      <ShowcaseContext.Consumer>
        {({ currentSlide }) => (
          <Route>
            {({ location }:RouteComponentProps<any>) => {
              const { key, pathname } = location;
              console.log('pathname', pathname);
              return (
                <TransitionGroup>
                  <Transition
                    key={key}
                    appear={true}
                    onEnter={(node, isAppearing) => {
                      if (pathname === '/')
                        return enterShowcase(currentSlide, isAppearing, node);
                      if (!isAppearing && pathname.search('/product') > -1)
                        return enterProduct(node);

                      return !isAppearing ? enterDefault(node) : null;
                    }}
                    onExit={(node) => {
                      if (pathname === '/')
                        return exitShowcase(currentSlide, node);
                      if (pathname.search('/product') > -1)
                        return exitProduct(node);

                      return exitDefault(node);
                    }}
                    timeout={2000}
                  >
                    <Switch location={location}>
                      {routes.map(({path, name, Component}) => (
                        <Route
                          key={path}
                          component={Component}
                          exact
                          id={name}
                          path={path}
                        />
                      ))}
                    </Switch>
                  </Transition>
                </TransitionGroup>
              )
            }}
          </Route>
        )}
      </ShowcaseContext.Consumer>
    </ShowcaseProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
