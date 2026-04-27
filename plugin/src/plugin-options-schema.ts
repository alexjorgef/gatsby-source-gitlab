import type { GatsbyNode } from "gatsby"
import type { ObjectSchema } from "gatsby-plugin-utils"

const wrapOptions = (innerOptions: string) => `{
  resolve: \`@alexjorgef/gatsby-source-gitlab\`,
  options: {
    ${innerOptions.trim()}
  },
}
`

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }): ObjectSchema =>
  Joi.object({
    apiUrl: Joi.string()
      .description(`The GitLab API URL.`)
      .meta({ example: wrapOptions(`apiUrl: \`https://gitlab.com/api/graphql\`,`) })
      .default(`https://gitlab.com/api/graphql`),
    accessToken: Joi.string()
      .required()
      .description(`The GitLab API access token used for authentication.`)
      .meta({
        example: wrapOptions(`accessToken: \`glpat-xxxxxxxxxxxxxxxxxxxxx\`,`),
      }),
    queries: Joi.array()
      .items(Joi.string())
      .required()
      .description(`List of search queries to execute against the GitLab API.`)
      .meta({
        example: wrapOptions(`queries: ["repo:openai/gpt-4", "user:octocat"],`),
      }),
  })
