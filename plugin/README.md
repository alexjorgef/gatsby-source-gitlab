# @alexjorgef/gatsby-source-gitlab

Source playlists from [GitLab](https://www.gitlab.com/) into [Gatsby](https://www.gatsbyjs.com/).

## Install

```shell
npm install @alexjorgef/gatsby-source-gitlab
```

## How to use

Add the plugin to your `gatsby-config` file:

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@alexjorgef/gatsby-source-gitlab`,
      options: {}
    }
  ]
}
```

## Plugin Options

- [@alexjorgef/gatsby-source-gitlab](#alexjorgefgatsby-source-gitlab)
  - [Install](#install)
  - [How to use](#how-to-use)
  - [Plugin Options](#plugin-options)
    - [accessToken (**required**)](#accesstoken-required)
    - [queries (**required**)](#queries-required)
    - [apiUrl (optional)](#apiurl-optional)

### accessToken (**required**)

The GitLab API access token used for authentication.

**Field type**: `string`

```js
{
  resolve: `@alexjorgef/gatsby-source-gitlab`,
  options: {
    accessToken: `glpat-xxxxxxxxxxxxxxxxxxxxx`,
  },
}
```

### queries (**required**)

List of search queries to execute against the GitLab API.

**Field type**: `string[]`

```js
{
  resolve: `@alexjorgef/gatsby-source-gitlab`,
  options: {
    queries: [
      `{
        repository(owner: "torvalds", name: "linux") {
          name
          url
        }
      }`,
      `{
        repository(owner: "gatsbyjs", name: "gatsby") {
          name
          url
          stargazerCount
        }
      }`,
    ]
  },
}
```

### apiUrl (optional)

The GitLab API URL to use.

**Field type**: `string`

```js
{
  resolve: `@alexjorgef/gatsby-source-gitlab`,
  options: {
    apiUrl: `https://gitlab.com/api/graphql`,
  },
}
```
