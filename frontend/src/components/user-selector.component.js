import * as React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

const UserSelector = (props) => {
    return <div>{props.root.users[0].displayName}</div>
};

export default createFragmentContainer(UserSelector, {
    root: graphql`
    fragment userSelector_root on RootQuery {
      users {
        displayName
      }
    }
  `,
});