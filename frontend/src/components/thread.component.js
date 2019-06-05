import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

const Thread = props => {
  return (
    <div>
      {props.me.threads[0].messages.map(m => (
        <div key={m.id}>{m.text}</div>
      ))}
    </div>
  );
};

export default createFragmentContainer(Thread, {
  me: graphql`
    fragment thread_me on User {
      threads {
        messages {
            id
            text
        }
      }
    }
  `
});
