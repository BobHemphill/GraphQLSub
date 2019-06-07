import * as React from "react";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender, makeRouteConfig, Route, RedirectException } from "found";
import { graphql } from "react-relay";
import { Resolver } from "found-relay";
import UserSelector from "./components/user-selector.component";
import UserThreadSelector from "./components/user-thread-selector.component";
import Thread from "./components/thread.component";
import StorageService from "./session/storage-service";

const redirectWithoutUserId = ({ Component, props }) => {
  if (!Component || !props) {
    return null;
  }
  if (!StorageService.getUser()) {
    throw new RedirectException("/");
  }
}

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
      <Route path="threads/" render={redirectWithoutUserId} >
        <Route 
          Component={UserThreadSelector}
          query={graphql`
            query routerUserThreadSelectorQuery {
              me {
                ...userThreadSelector_me
              }
            }
          `}
        />
        <Route path=":id" render={redirectWithoutUserId} >
          <Route
            Component={Thread}
            query={graphql`
              query routerThreadQuery($id: ID!) {
                thread: node(id: $id) {
                  id
                  ...on Thread {
                    ...thread_thread
                  }
                }
              }
            `}
          />
        </Route>
      </Route>
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
