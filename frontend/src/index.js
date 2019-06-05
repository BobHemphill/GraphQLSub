import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import relayEnvironment from "./relay/environment";

ReactDOM.render(
  <Router environment={relayEnvironment} />,
  document.getElementById("app")
);
