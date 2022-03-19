import { useQuery } from "@apollo/client"
import React from "react"
import { getBooksQuery } from "../queries/queries"


function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery)

	if (loading) return "Loading..."
	if (error) return `Error! ${error.message}`

	return (
		<div>
			<ul>
				{data.books.map((book) => (
					<li>{book.name}</li>
				))}
			</ul>
		</div>
	)
}

export default BookList
