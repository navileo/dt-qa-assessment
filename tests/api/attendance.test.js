const { test, expect } = require('@playwright/test');

test.describe('Attendance API', () => {

  test('Attendance route exists and requires auth', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/data_kehadiran');
    // Should not be 404 - route exists
    expect(response.status()).not.toBe(404);
  });

  test('Attendance route blocks unauthenticated access', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/data_kehadiran');
    // Should return 401 or 403 - not open to public
    // BUG if returns 200 without auth
    expect([401, 403, 302]).toContain(response.status());
  });

  test('Employee route exists and requires auth', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/data_pegawai');
    expect(response.status()).not.toBe(404);
  });

  test('Employee route blocks unauthenticated access', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/data_pegawai');
    expect([401, 403, 302]).toContain(response.status());
  });

});