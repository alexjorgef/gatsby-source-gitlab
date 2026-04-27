import type { IPluginRefOptions, PluginOptions as GatsbyPluginOptions } from "gatsby"

export interface GithubPluginOptions extends IPluginRefOptions {
  apiUrl: string
  accessToken: string
  queries: string[]
}

export interface GithubNodePluginOptions extends GatsbyPluginOptions {
  apiUrl: string
  accessToken: string
  queries: string[]
}
