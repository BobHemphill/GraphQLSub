import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { withRouter } from "found";

const UserSelector = props => {
  const onClick = () => {
    props.router.push("/users/1");
  }
  return (
    <div>
      {props.root.users.map(u => (
        <div onClick={onClick} key={u.id}>{u.displayName}</div>
      ))}
    </div>
  );
};

export default createFragmentContainer(withRouter(UserSelector), {
  root: graphql`
    fragment userSelector_root on RootQuery {
      users {
        id
        displayName
      }
    }
  `
});
