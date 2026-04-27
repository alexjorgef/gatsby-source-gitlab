import { test, expect } from "@playwright/test"

test.describe(`Kitchen Sink`, () => {
  test(`should build and serve index page`, async ({ page }) => {
    await page.goto(`/`)

    await expect(page).toHaveTitle(`@alexjorgef/gatsby-source-gitlab`)
  })
  test(`contains elements`, async ({ page }) => {
    await page.goto(`/`)

    await expect(await page.locator(`h1:has-text("@alexjorgef/gatsby-source-gitlab")`)).toBeVisible()
    await expect(await page.locator(`text=Name: GitLab FOSS`)).toBeVisible()
    await expect(await page.locator(`text=ID: __gitlab__repository__0`)).toBeVisible()
    await expect(await page.locator(`text=URL: https://gitlab.com/gitlab-org/gitlab-foss`)).toBeVisible()
    await expect(await page.locator(`text=Demo of @alexjorgef/gatsby-source-gitlab – GitHub – Website`)).toBeVisible()
  })
})
