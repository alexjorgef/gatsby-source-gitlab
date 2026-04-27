import type { GatsbyNode } from "gatsby"
import { GraphQLClient } from "graphql-request"
import { startCase, toLower } from "lodash"
import crypto from "crypto"
import { ERROR_CODES, NODE_TYPE_BASE } from "./constants"
import type { GithubNodePluginOptions } from "./types/plugin-options"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (gatsbyApi, pluginOptions: GithubNodePluginOptions) => {
  const { apiUrl, queries, accessToken } = pluginOptions

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }
  gatsbyApi.reporter.verbose(`Starting GitLab requests (${apiUrl})...`)
  const client = new GraphQLClient(apiUrl, {
    headers,
  })

  const getRootEl = (obj: Record<string, any>): string => Object.keys(obj).shift()

  const upper = (str: string): string => startCase(toLower(str))

  const createContentDigest = (obj: Record<string, any>): string =>
    crypto.createHash(`md5`).update(JSON.stringify(obj)).digest(`hex`)

  const findEdge = (obj: Record<string, any>): Record<string, any> => {
    let clone = { ...obj }
    while (Object.keys(clone).length > 0) {
      const rootEl = getRootEl(clone)
      if (clone[rootEl] && Array.isArray(clone[rootEl].edges)) {
        return clone
      }
      clone = clone[rootEl]

      if (typeof clone !== `object`) {
        break
      }
    }

    return obj
  }

  try {
    await Promise.all(
      queries.map((q) => {
        try {
          gatsbyApi.reporter.verbose(`GitLab query: ${q}`)
          const reqRes = client.request(q)
          return reqRes
        } catch (err) {
          const errObj = err as Error
          gatsbyApi.reporter.error(`GitLab query failed:\n${q}\n${errObj}`)
          throw err
        }
      })
    ).then((results) => {
      results.forEach((content, index) => {
        gatsbyApi.reporter.verbose(`Result #${index}: ${JSON.stringify(content)}`)
        const edge = findEdge(content)
        const rootName = getRootEl(edge)
        const rootElement = edge[rootName]
        const { edges, ...rest } = rootElement
        if (rootElement && Array.isArray(edges)) {
          edges.forEach((childNode: any, edgeIndex: number) => {
            const node = childNode.node || childNode
            gatsbyApi.actions.createNode({
              ...rest,
              ...node,
              id: node.id || `__gitlab__${rootName}__${edgeIndex}__`,
              children: [],
              parent: `__SOURCE__`,
              internal: {
                type: `${NODE_TYPE_BASE}${upper(rootName)}`,
                contentDigest: createContentDigest(node),
                content: JSON.stringify(node),
              },
            })
          })
        } else {
          gatsbyApi.actions.createNode({
            ...rootElement,
            id: rootElement.id || `__gitlab__${rootName}__${index}`,
            children: [],
            parent: `__SOURCE__`,
            internal: {
              type: `${NODE_TYPE_BASE}${upper(rootName)}`,
              contentDigest: createContentDigest(rootElement),
              content: JSON.stringify(rootElement),
            },
          })
        }
      })
    })
  } catch (error) {
    const errorObj = error as Error
    gatsbyApi.reporter.panicOnBuild({
      id: ERROR_CODES.gitlabRequest,
      context: {
        sourceMessage: errorObj.message,
        apiUrl,
      },
    })
    throw error
  }
}
