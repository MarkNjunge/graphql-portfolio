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
          ${repoFields}
        }
      }
    }
  }`;

  const data = await makeRequest(query);

  return data.viewer.repositories.nodes.map(node => repoFieldsToObject(node));
}

async function getSingleGithubRepo(name) {
  const ghUsername = getGithubUsername();
  const query = `
  {
    repository(owner: "${ghUsername}", name: "${name}"){
      ${repoFields}
    }
  }
  `;

  try {
    const data = await makeRequest(query);
    return repoFieldsToObject(data.repository);
  } catch (e) {
    if (e[0].type == "NOT_FOUND") {
      throw Error(`Repository '${name}' does not exist!`);
    } else {
      throw Error(e[0].message);
    }
  }
}

const repoFields = `
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
    languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
      nodes {
        name
        color
      }
    }
`;

function getGithubUsername() {
  const splits = data.github.split("/");
  return splits[splits.length - 1];
}

async function makeRequest(query) {
  const res = await axios.post(
    "https://api.github.com/graphql",
    { query },
    {
      headers: {
        Authorization: "bearer " + process.env.GITHUB_TOKEN
      }
    }
  );

  return new Promise((resolve, reject) => {
    if (res.data.errors) {
      reject(res.data.errors);
    } else {
      resolve(res.data.data);
    }
  });
}

function repoFieldsToObject(node) {
  return {
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
  };
}

module.exports = {
  data,
  getGithubRepos,
  getSingleGithubRepo
};
