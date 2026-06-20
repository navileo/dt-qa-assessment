const { test, expect } = require('@playwright/test');

test.describe('Employee Management', () => {

  test('Admin can view employee list', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3000);
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(3000);

    // Go to employee data
    await page.goto('http://localhost:5173/admin/data_pegawai');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/data_pegawai/);
  });

  test('Admin can access attendance page', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3000);
    await page.fill('input[placeholder="Enter your username"]', 'aldi');
    await page.fill('input[placeholder="Enter your password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(3000);

    // Go to attendance
    await page.goto('http://localhost:5173/admin/data_kehadiran');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/data_kehadiran/);
  });

  test('BUG: Unauthenticated user can access dashboard (no auth guard)', async ({ page }) => {
    await page.goto('http://localhost:5173/admin/dashboard');
    await page.waitForTimeout(3000);
    // This SHOULD redirect to login but app allows direct access - security bug
    await expect(page).toHaveURL(/admin\/dashboard/);
  });

});