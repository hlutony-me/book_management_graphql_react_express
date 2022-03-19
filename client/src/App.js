import "./App.css"
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql
} from "@apollo/client"
import BookList from "./components/BookList"
import AddBook from "./components/AddBook"

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache()
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
        <BookList />
        <AddBook/>
			</div>
		</ApolloProvider>
	)
}

export default App
