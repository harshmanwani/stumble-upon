import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { AUTH_TOKEN } from './constants';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint, prodEndpoint } from './config.js'

const httpLink = createHttpLink({
	uri: process.env.NODE_ENV === 'development' ? `http${endpoint}` : `https${prodEndpoint}`,
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const wsLink = new WebSocketLink({
	uri: process.env.NODE_ENV === 'development' ? `wss${endpoint}` : `wss${prodEndpoint}`,
	options: {
		reconnect: true,
		connectionParams: {
			authToken: localStorage.getItem(AUTH_TOKEN),
		}
	}
})

// using split for proper 'routing' of the requests. between socket and normal requests.
// the first argument which is a test function returns a boolean.
// if true, the request will be forwarded to the link passed in the second argument (wsLink). else to the third one.
// Hybrid Link -> Apollo-Link -> (Query/Mutation -> Http-Link) ||  (Subscriptions -> WebSocket-Link )
const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})


ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />	
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
