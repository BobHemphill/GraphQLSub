import * as React from "react";
import { createFragmentContainer, graphql, requestSubscription } from "react-relay";
import environment from "../relay/environment";

const subscriptionQuery = graphql`
  subscription threadMessageSubscription($input:messageAddedSubscriptionInput!){
    messageAddedSubscription(input:$input) {
      message {
        id
        text
      }
    }
  }
`;
class Thread extends React.Component {
  componentDidMount() {
    const subscriptionConfig = {
      subscription: subscriptionQuery,
      variables: { input: { threadId: this.props.thread.id } },
      updater: (store, data) => {
        const rootField = store.getRootField('messageAddedSubscription');
        const message = rootField.getLinkedRecord('message');
        
        const thread = store.get(this.props.thread.id);
        const messages = thread.getLinkedRecords('messages');
        thread.setLinkedRecords([...messages, message], 'messages');
      },
    };

    requestSubscription(environment, subscriptionConfig);
  }
  render() {
    return (<div>
      {this.props.thread.messages.map(m => (
        <div key={m.id}>{m.text}</div>
      ))}
    </div>);
  }
};

export default createFragmentContainer(Thread, {
  thread: graphql`
    fragment thread_thread on Thread {
      id
      messages {
        id
        text
      }
    }
  `
});
