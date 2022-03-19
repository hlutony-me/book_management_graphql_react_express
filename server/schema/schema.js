const { type } = require("express/lib/response")
const graphql = require("graphql")
const Author = require("../models/author")
const Book = require("../models/book")
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AutherType,
			resolve(parent, ags) {
				return Author.findById(parent.authorId)
			}
		}
	})
})

const AutherType = new GraphQLObjectType({
	name: "Auther",
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({authorId:parent.id})
			}
		}
	})
})



const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return Book.findById(args.id)
			}
		},
		author: {
			type: AutherType,
			args: { id: { type: graphql.GraphQLString } },
			resolve(parent, args) {
				return Author.findById(args.id)
			}
		},
		books: {
			type: new graphql.GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find()
			}
		},
		authors: {
			type: new graphql.GraphQLList(AutherType),
			resolve(parent, args) {
				return Author.find()
			}
		}
	})
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AutherType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			async resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				})
				return await author.save()
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLID }
			},
			async resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return await book.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
