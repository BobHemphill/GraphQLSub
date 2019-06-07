import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import StorageService from "../session/storage-service";

function fetchQuery(operation, variables) {
  const userId = StorageService.getUser();
  return fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
}

const subscriptionClient = new SubscriptionClient("ws://localhost:3000/graphql", {
  reconnect: true,
});
const subscriptionLink = new WebSocketLink(subscriptionClient);
const subFn = (operation, variables) =>
			execute(subscriptionLink, {
				query: operation.text,
				variables,
			});
const environment = new Environment({
  network: Network.create(fetchQuery, subFn),
  store: new Store(new RecordSource())
});

export default environment;
