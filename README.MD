# Graphql Portfolio

A GraphQL portfolio. Live: https://portfolio.marknjunge.com/

Inspired by [Sara Vieira](https://iamsaravieira.com/)'s portfolio.

## Installation

1. Clone

```bash
git clone https://github.com/MarkNjunge/graphql-portfolio
```

2. Create a JSON file with your details. See [DataFormat.MD](./DataFormat.MD) for more info or a [complete example](https://marknjunge.com/profile-data.json).

3. Create a _.env_ file based on [.env.sample](./.env.sample)

```bash
cp .env.sample .env
```

For the `GITHUB_TOKEN`, [create a personal access token](https://github.com/settings/tokens/new) with access to public repos.

4. Install dependencies

```
yarn install
```

5. Run

```bash
yarn start
```
