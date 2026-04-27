import { describe, it, expect } from "vitest"
import { testPluginOptionsSchema } from "gatsby-plugin-utils"
import { pluginOptionsSchema } from "../plugin-options-schema"

describe(`pluginOptionsSchema`, () => {
  it(`should invalidate incorrect options (root)`, async () => {
    const options = {
      accessToken: undefined,
      queries: undefined,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(false)
    expect(errors).toEqual([`"accessToken" is required`, `"queries" is required`])
  })
  it(`should invalidate incorrect options (deep)`, async () => {
    const options = {}

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(false)
    expect(errors).toEqual([`"accessToken" is required`, `"queries" is required`])
  })
  it(`should validate correct options`, async () => {
    const options = {
      accessToken: `test`,
      queries: [],
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(true)
    expect(errors).toEqual([])
  })
})
