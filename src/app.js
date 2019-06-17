require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const schema = require("./schema");

const PORT = process.env.PORT || process.argv[2] || 3000;

const server = new GraphQLServer({
  schema
});

const context = req => ({
  request: req.request
});
server.context = context;

const options = {
  port: PORT,
  endpoint: "/graphql",
  playground: "/",
  defaultPlaygroundQuery: `
  # My name is Mark and I am a software developer from Nairobi, Kenya.
  # I made this GraphQL API as portfolio.
  # Check out the Docs and here is a sample query.
  
  {
    name
    email
    github
    projects(count: 5) {
      title
      description
      tags
    }
  }
  
  `
};

server
  .start(options)
  .then(() => {
    console.log("Server is running on port " + PORT);
  })
  .catch(reason => {
    console.log(reason);
  });
