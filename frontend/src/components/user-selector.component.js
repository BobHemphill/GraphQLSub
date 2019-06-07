import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { withRouter } from "found";
import StorageService from "../session/storage-service";

const UserSelector = props => {
  const onClick = (selectedUserId) => {
    StorageService.setUser(selectedUserId);
    props.router.push(`/threads/`);
  }
  return (
    <div>
      <h3>Select a user</h3>
      {props.root.users.map(u => (
        <div onClick={() => onClick(u.id)} key={u.id}>{u.displayName}</div>
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
