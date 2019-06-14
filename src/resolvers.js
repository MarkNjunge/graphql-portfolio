const fs = require("fs");
const axios = require("axios").default;

const data = JSON.parse(
  fs.readFileSync(__dirname + "/../data.json").toString()
);

module.exports = {
  Query: {
    name: () => data.name,
    email: () => data.email,
    github: () => data.github,
    CV: () => data.CV,
    employed: () => data.employed,
    experience: () => data.experience,
    projects: () => data.projects,
    repos: async (parent, { count }) => {
      const query = `
            query { 
              viewer { 
                repositories(first:${count}, orderBy:{field:STARGAZERS, direction:DESC}){
                  nodes{
                    name
                    description
                    url
                    languages(first: 1){
                      nodes{
                        name
                      }
                    }
                  }
                }
              }
            }
      `;
      const res = await axios.post(
        "https://api.github.com/graphql",
        { query },
        {
          headers: {
            Authorization: "bearer " + process.env.GITHUB_TOKEN
          }
        }
      );

      const data = res.data.data;
      return data.viewer.repositories.nodes.map(node => ({
        name: node.name,
        description: node.description,
        url: node.url,
        language: node.languages.nodes[0].name
      }));
    }
  }
};
