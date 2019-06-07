import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { withRouter } from "found";

const UserThreadSelector = props => {
    const onClick = (selectedThreadId) => {
        props.router.push(`/threads/${selectedThreadId}`)
    }
  return (
    <div>
      <h3>Select a thread</h3>
      {props.me.threads.map(t => (
        <div key={t.id} onClick={() => onClick(t.id)}>{t.displayName}</div>
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
