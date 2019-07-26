const { getGithubRepos, getSingleGithubRepo } = require("./lib");
const axios = require("axios").default;

var profileInfo = {};
(async () => {
  try {
    const dataFileUrl = process.env.PROFILE_INFO_URL;
    if (!dataFileUrl) {
      throw Error("PROFILE_INFO_URL not specified in environment");
    }

    const res = await axios.get(dataFileUrl);
    profileInfo = res.data;

    console.log("Fetched profile info");
  } catch (e) {
    console.error(`Unable to fetch profile info: ${e.message}`);
    process.exit();
  }
})();

module.exports = {
  Query: {
    name: () => profileInfo.name,
    email: () => profileInfo.email,
    github: () => profileInfo.github,
    website: () => profileInfo.website,
    linkedin: () => profileInfo.linkedin,
    cv: () => profileInfo.cv,
    employed: () => profileInfo.employed,
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
  }
};
