# Graphql Portfolio

A GraphQL portfolio. Live: https://portfolio.marknjunge.com/

Inspired by [Sara Vieira](https://iamsaravieira.com/)'s portfolio.

## Installation

- Clone

```bash
git clone https://github.com/MarkNjunge/graphql-portfolio
```

- Modify [data.json](./data.json). See [DataFormat.MD](./DataFormat.MD) for more info.

- Create a _.env_ file based on [.env.sample](./.env.sample)

```bash
cp .env.sample .env
```

For the `GITHUB_TOKEN`, [create a personal access token](https://github.com/settings/tokens/new) with access to public repos.

- Install dependencies

```
yarn install
```

- Run

```bash
yarn start
```
