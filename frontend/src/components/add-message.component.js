import * as React from "react";
import { createFragmentContainer, graphql, commitMutation } from "react-relay";
import environment from "../relay/environment";

const mutationQuery = graphql`
    mutation addMessageMutation($input:addMessageInput!){
        addMessage(input:$input) {
            message{
                id
            }
        }
    }
`;

const AddMessage = props => {
    const [textInput, setTextInput] = React.useState('');
    const onAddClick = () => {
        const variables = {
            input: {
                threadId: props.thread.id,
                text: textInput,
            },
        };
        commitMutation(environment, { 
            mutation: mutationQuery,
            variables,
        });
    }
  return (
      <div>
          <input onChange={(e) => { setTextInput(e.target.value) }} value={textInput} type="text" />
          <button onClick={onAddClick}>Add Message</button>
      </div>
    
  );
};

export default createFragmentContainer(AddMessage, {
  thread: graphql`
    fragment addMessage_thread on Thread {
      id
    }
  `
});