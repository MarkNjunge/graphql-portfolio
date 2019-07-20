const { data, getGithubRepos, getSingleGithubRepo } = require("./lib");

module.exports = {
  Query: {
    name: () => data.name,
    email: () => data.email,
    github: () => data.github,
    website: () => data.website,
    linkedin: () => data.linkedin,
    cv: () => data.cv,
    employed: () => data.employed,
    otherLinks: () => data.otherLinks,
    experience: () => data.experience,
    projects: (_, { count }) => data.projects.slice(0, count),
    project: (_, { title }) => {
      const project = data.projects.filter(p => p.title == title)[0];
      if (!project) {
        throw Error(`Project '${title}' does not exist!`);
      } else {
        return project;
      }
    },
    repos: (_, { count }) => getGithubRepos(count),
    repo: (_, { name }) => getSingleGithubRepo(name)
  }
};
