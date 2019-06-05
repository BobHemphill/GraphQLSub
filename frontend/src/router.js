import * as React from "react";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender, makeRouteConfig, Route } from "found";
import { graphql } from "react-relay";
import { Resolver } from "found-relay";
import UserSelector from "./components/user-selector.component";

const routeConfig = makeRouteConfig(
  <Route
    path="/"
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
