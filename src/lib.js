const axios = require("axios").default;

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
  const query = `
  {
    viewer {
      repository(name: "${name}") {
        ${repoFields}
      }
    }
  }
  `;

  const data = await makeRequest(query);
  const repo = data.viewer.repository;
  if (repo == null) {
    throw Error(`Repository '${name}' does not exist!`);
  } else {
    return repoFieldsToObject(repo);
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

async function makeRequest(query) {
  const res = await axios.post(
    "https://api.github.com/graphql",
    { query },
    {
      headers: {
        Authorization: "Bearer " + process.env.GITHUB_TOKEN
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
  getGithubRepos,
  getSingleGithubRepo
};
