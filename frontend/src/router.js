import * as React from "react";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender, makeRouteConfig, Route } from "found";
import { graphql } from "react-relay";
import { Resolver } from "found-relay";
import UserSelector from "./components/user-selector.component";
import UserThreadSelector from "./components/user-thread-selector.component";
import Thread from "./components/thread.component";

const routeConfig = makeRouteConfig(
  <Route path="/">
      <Route 
        Component={UserSelector}
        query={graphql`
          query routerUserSelectorQuery {
            ...userSelector_root
          }
        `}
        render={({ Component, props }) => {
          if (!Component || !props) {
            return null;
          }
          // Looks like found-relay will not propogate ROOTQUERY var
          return <Component root={props} />;
        }}
      />
      <Route 
        path="users/:id"
        Component={UserThreadSelector}
        query={graphql`
          query routerUserThreadSelectorQuery {
            me {
              ...userThreadSelector_me
            }
          }
        `}
      />
      <Route 
        path="threads/:id"
        Component={Thread}
        query={graphql`
          query routerThreadQuery {
            me {
              ...thread_me
            }
          }
        `}
      />
  </Route>
);

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig,
  render: createRender({})
});

export default function({ environment }) {
  return <Router resolver={new Resolver(environment)} />;
}
