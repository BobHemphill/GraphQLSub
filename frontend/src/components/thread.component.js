import * as React from "react";
import { createFragmentContainer, graphql, requestSubscription } from "react-relay";
import environment from "../relay/environment";
import AddMessage from "./add-message.component";

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

    this.subDisposable = requestSubscription(environment, subscriptionConfig);
  }
  componentWillUnmount() {
    if (this.subDisposable) {
      this.subDisposable.dispose();
      this.subDisposable = undefined;
    }
  }
  render() {
    return (<div>
      <h3>Add a message</h3>
      <AddMessage thread={this.props.thread} />
      <h3>messages</h3>
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
      ...addMessage_thread
      messages {
        id
        text
      }
    }
  `
});
