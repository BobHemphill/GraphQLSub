import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { withRouter } from "found";

const UserThreadSelector = props => {
    const onClick = () => {
        props.router.push("/threads/1")
    }
  return (
    <div>
      {props.me.threads.map(t => (
        <div key={t.id} onClick={onClick}>{t.displayName}</div>
      ))}
    </div>
  );
};

export default createFragmentContainer(withRouter(UserThreadSelector), {
  me: graphql`
    fragment userThreadSelector_me on User {
      threads {
        id  
        displayName
      }
    }
  `
});
