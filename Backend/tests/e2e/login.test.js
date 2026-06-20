import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  
  test('Admin can login successfully', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'admin123');
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('Login fails with wrong password', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.click('button:has-text("Login")');
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('Login fails with empty fields', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Login")');
    await expect(page).not.toHaveURL(/dashboard/);
  });

});
