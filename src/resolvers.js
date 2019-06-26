const fs = require("fs");
const axios = require("axios").default;

const data = JSON.parse(
  fs.readFileSync(__dirname + "/../data.json").toString()
);

async function getGithubRepos(count) {
  const query = `
  {
    viewer {
      repositories(first: ${count}, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          description
          url
          stargazers {
            totalCount
          }
          forkCount
          issues {
            totalCount
          }
          pullRequests(states: [OPEN]) {
            totalCount
          }
          releases {
            totalCount
          }
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
              color
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
    stars: node.stargazers.totalCount,
    forks: node.forkCount,
    issues: node.issues.totalCount,
    pullRequests: node.pullRequests.totalCount,
    releases: node.releases.totalCount,
    languages: node.languages.nodes.map(lang => ({
      name: lang.name,
      color: lang.color
    }))
  }));
}

module.exports = {
  Query: {
    name: () => data.name,
    email: () => data.email,
    github: () => data.github,
    CV: () => data.CV,
    employed: () => data.employed,
    experience: () => data.experience,
    projects: (parent, { count }) => data.projects.slice(0, count),
    repos: (parent, { count }) => getGithubRepos(count)
  }
};
