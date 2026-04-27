import "dotenv/config"
import type { GatsbyConfig, PluginRef } from "gatsby"
import type { GithubPluginOptions } from "@alexjorgef/gatsby-source-gitlab"

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `@alexjorgef/gatsby-source-gitlab`,
    siteUrl: `https://github.com/alexjorgef/gatsby-source-gitlab/`,
  },
  jsxRuntime: `automatic`,
  graphqlTypegen: {
    generateOnBuild: true,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@alexjorgef/gatsby-source-gitlab`,
      options: {
        apiUrl: `https://gitlab.com/api/graphql`,
        accessToken: process.env.ACCESS_TOKEN,
        queries: [
          `{
            repository: project(fullPath: "gitlab-org/gitlab-foss") {
              stargazerCount: starCount
              description
              name
              url: webUrl
              avatar: avatarUrl
            }
          }`,
        ],
      } as GithubPluginOptions,
    },
  ] as PluginRef[],
}

export default config
