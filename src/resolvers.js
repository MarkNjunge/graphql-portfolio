const { data, getGithubRepos } = require("./lib");

module.exports = {
  Query: {
    name: () => data.name,
    email: () => data.email,
    github: () => data.github,
    CV: () => data.CV,
    employed: () => data.employed,
    experience: () => data.experience,
    projects: (_, { count }) => data.projects.slice(0, count),
    repos: (_, { count }) => getGithubRepos(count)
  }
};
