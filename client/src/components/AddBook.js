import { useMutation, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { getAuthorsQuery } from "../queries/queries"
const { gql } = require("@apollo/client")

const ADD_BOOK_MUTATION = gql`
	mutation AddBook($name: String!, $genre: String!,$authorId:ID!) {
		addBook(name:$name,genre:$genre,authorId:$authorId){
			name
		}
	}
`

function AddBook() {
	const {
		data: authorsData,
		loading: authorsLoading,
		error: authorsError
	} = useQuery(getAuthorsQuery)
	const [newBook, setNewBook] = useState({
		name: "",
		genre: "",
		authorId: ""
	})
	const [addBook, { data, loading, error }] = useMutation(
		ADD_BOOK_MUTATION
	)

	const onInputChange = (e) => {
		setNewBook({ ...newBook, [e.target.name]: e.target.value })
		console.log(newBook)
	}

	const handleAddBook = (e) => {
		e.preventDefault()
		console.log(newBook)
		addBook({
			variables: {
				name: newBook.name,
				genre: newBook.genre,
				authorId: newBook.authorId
			}
		})
	}
	return (
		<form id="add-book" onSubmit={(e) => handleAddBook(e)}>
			<div className="field">
				<label>Book name:</label>
				<input
					name="name"
					type="text"
					value={newBook.name}
					onChange={(e) => onInputChange(e)}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					name="genre"
					type="text"
					value={newBook.genre}
					onChange={(e) => onInputChange(e)}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select onChange={(e) => onInputChange(e)} name="authorId">
					{authorsData?.authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>
			</div>
			<button>+</button>
		</form>
	)
}

export default AddBook
