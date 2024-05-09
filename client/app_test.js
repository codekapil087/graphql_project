import { ApolloClient, InMemoryCache, gql, WebSocketLink } from 'apollo-boost';

// Create a WebSocket link
const wsLink = new WebSocketLink({
  uri: 'ws://127.0.01:9000/',
  options: {
    reconnect: true
  }
});

// Create an Apollo client with the WebSocket link
const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

// Define the subscription query
const SUBSCRIPTION_QUERY = gql`
  subscription {
    newMessage {
      id
      content
      createdAt
    }
  }
`;

// Subscribe to the subscription query
const subscription = client.subscribe({ query: SUBSCRIPTION_QUERY });

// Handle the subscription updates
subscription.subscribe({
  next(response) {
    const newMessage = response.data.newMessage;
    console.log('New message received:', newMessage);
    // Handle the new message data here
  },
  error(err) {
    console.error('Subscription error:', err);
  }
});
