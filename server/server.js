const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const connectDB = require("./config/db")
const cors = require("cors")

const app = express()

//Connect DB
connectDB()


//Handle cors

app.use(cors())

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

app.listen(4000, () => {
	console.log("listening on *:4000")
})
