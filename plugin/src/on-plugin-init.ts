import type { GatsbyNode } from "gatsby"
import { ERROR_CODES, NODE_TYPE_BASE } from "./constants"

export const onPluginInit: GatsbyNode["onPluginInit"] = ({ reporter }) => {
  reporter.setErrorMap({
    [ERROR_CODES.userIdNotFound]: {
      text: (context) =>
        `Couldn't find a user_id for the username "${context.username}". Did you enter the correct username?

Original error: ${context.sourceMessage}`,
      level: `ERROR`,
      category: `USER`,
    },
    [ERROR_CODES.gitlabRequest]: {
      text: (context) =>
        `There was an error creating the "${NODE_TYPE_BASE}" node.

Original error (apiUrl: ${context.apiUrl}): ${context.sourceMessage}`,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
  })
}
