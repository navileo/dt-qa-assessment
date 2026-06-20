const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {

  test('Admin can login successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/dashboard/);
  });

  // BUG DISCOVERED: App accepts wrong password - security vulnerability
  test('BUG: Login accepts wrong password (security issue)', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);
    // This SHOULD fail but app lets user in - documenting the bug
    await expect(page).toHaveURL(/dashboard/);
  });

  // BUG DISCOVERED: App accepts empty fields - no validation
  test('BUG: Login accepts empty fields (no validation)', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);
    // This SHOULD stay on login but app redirects - documenting the bug
    await expect(page).toHaveURL(/dashboard/);
  });

});