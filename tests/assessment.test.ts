import { test, expect } from '@playwright/test';

test('should submit teacher form and show success popup', async ({ page }) => {
  // Start from the index page
  await page.goto('http://localhost:3001/');

  // Switch to the teacher form tab
  await page.click('text=Register as a teacher');

  // Fill and submit the teacher form
  await page.fill('Select[name="title"]', 'Mr');
  await page.fill('Input[name="lastName"]', 'Doe');
  await page.fill('Input[name="firstName"]', 'John');
  await page.fill('Input[name="dateOfBirth"]', '2023-08-03T23:00:00.000Z');
  await page.fill('Input[name="phoneNumber"]', '08106453311');
  await page.fill('Input[name="nin"]', '111111111');
  await page.fill('Input[name="salary"]', '10000');

  // Wait for the success popup to appear
  await page.waitForSelector('.Toastify__toast-body');

  // Assert that the success popup is visible
  await expect(page.locator('.Toastify__toast-body')).toBeVisible();

  // Navigate to the teachers page
  await page.goto('http://localhost:3001/teachers');

  // Assert that the URL has changed to /teachers
  await expect(page).toHaveURL('http://localhost:3001/teachers');
});

test('should submit student form and show success popup', async ({ page }) => {
  // Start from the index page
  await page.goto('http://localhost:3001/');

  // Switch to the student form tab
  await page.click('text=Register as a student');

  // Fill and submit the student form
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="dateOfBirth"]', '2023-08-03T23:00:00.000Z');
  await page.fill('input[name="phoneNumber"]', '08106453311');
  await page.fill('input[name="nin"]', '1111111');
  await page.click('button[type="submit"]');

  // Wait for the success popup to appear
  await page.waitForSelector('.Toastify__toast-body');

  // Assert that the success popup is visible
  await expect(page.locator('.Toastify__toast-body')).toBeVisible();

  // Navigate to the students page
  await page.goto('http://localhost:3001/students');

  // Assert that the URL has changed to /students
  await expect(page).toHaveURL('http://localhost:3001/students');
});
