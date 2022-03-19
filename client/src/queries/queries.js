const { gql } = require("@apollo/client");

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`




export { getAuthorsQuery, getBooksQuery }
