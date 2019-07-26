# Graphql Portfolio

A GraphQL portfolio. Live: https://portfolio.marknjunge.com/

Inspired by [Sara Vieira](https://iamsaravieira.com/)'s portfolio.

## Installation

1. Clone

```bash
git clone https://github.com/MarkNjunge/graphql-portfolio
```

2. Create a JSON file with your details. See [DataFormat.MD](./DataFormat.MD) for more info or a [complete example](https://gist.githubusercontent.com/MarkNjunge/4842ad56c7eb01bcf281013a25798fb2/raw/4d79607fb0d9e3a4e1a6283be0fc9d29d638d1b2/data.json).  
   Creating a gist for this is the best option. Make sure the url you provide is the **RAW URL**, not the webpage url.

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
