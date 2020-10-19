const { getGithubRepos, getSingleGithubRepo } = require("./lib");
const profileInfo = require("../data.json")

module.exports = {
  Query: {
    name: () => profileInfo.name,
    email: () => profileInfo.email,
    github: () => profileInfo.github,
    website: () => profileInfo.website,
    linkedin: () => profileInfo.linkedin,
    cv: () => profileInfo.cv,
    seekingEmployment: () => profileInfo.seekingEmployment,
    otherLinks: () => profileInfo.otherLinks,
    experience: () => profileInfo.experience,
    projects: (_, { count }) => profileInfo.projects.slice(0, count),
    project: (_, { title }) => {
      const project = profileInfo.projects.filter(p => p.title == title)[0];
      if (!project) {
        throw Error(`Project '${title}' does not exist!`);
      } else {
        return project;
      }
    },
    repos: (_, { count }) => getGithubRepos(count),
    repo: (_, { name }) => getSingleGithubRepo(name)
  },
};
