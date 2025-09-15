import { test, expect } from '@playwright/test'

// Basic: use baseURL and server

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('counter increments', async ({ page }) => {
  const btn = page.getByRole('button', { name: 'increment' })
  const count = page.getByTestId('count')
  await expect(count).toHaveText('0')
  await btn.click()
  await expect(count).toHaveText('1')
})

test('todo CRUD flow', async ({ page }) => {
  const input = page.getByLabel('New todo')
  const add = page.getByRole('button', { name: 'Add todo' })
  await input.fill('Buy milk')
  await add.click()
  await expect(page.getByText('Buy milk')).toBeVisible()
  await expect(page.getByTestId('remaining')).toHaveText('1')

  await page.getByLabel('toggle Buy milk').check()
  await expect(page.getByTestId('remaining')).toHaveText('0')

  await page.getByRole('button', { name: 'delete Buy milk' }).click()
  await expect(page.getByText('Buy milk')).toHaveCount(0)
})

test('modal open/close', async ({ page }) => {
  await page.getByRole('button', { name: 'Open modal' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toHaveCount(0)
})

test('theme toggle persists', async ({ page, context }) => {
  // Toggle
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  // Verify localStorage
  const theme = await page.evaluate(() => localStorage.getItem('theme'))
  expect(theme === 'dark' || theme === 'light').toBeTruthy()
  // New page should pick same theme
  const page2 = await context.newPage()
  await page2.goto('/')
  const theme2 = await page2.evaluate(() => localStorage.getItem('theme'))
  expect(theme2).toBe(theme)
})
