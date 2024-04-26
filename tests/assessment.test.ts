import { test, expect } from '@playwright/test';

test('TeacherForm submission', async ({ page }) => {
  // Visit the page
  await page.goto('http://localhost:3000');
  await page.click('text=Register as a teacher');

  // Fill in the form fields
  await page.selectOption('select[name="title"]', 'Mr');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="dateOfBirth"]', '1995-02-10');
  await page.fill('input[name="phoneNumber"]', '123-456-7890');
  await page.fill('input[name="nin"]', '111111111');
  await page.fill('input[name="salary"]', '10000');

  // Submit the form
  await page.click('text=Submit');

  // Wait for the success message to appear
  await page.waitForSelector('text=Created Successfully...');

  // Navigate to the teachers page
  await page.goto('http://localhost:3000/teachers');

  // Assert that the URL has changed to /teachers
  await expect(page).toHaveURL('http://localhost:3000/teachers');
});

test('StudentForm submission', async ({ page }) => {
  // Start from the index page
  await page.goto('http://localhost:3000');

  // Switch to the student form tab
  await page.click('text=Register as a student');

  // Fill and submit the student form
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="dateOfBirth"]', '2021-02-10');
  await page.fill('input[name="phoneNumber"]', '08106453311');
  await page.fill('input[name="nin"]', '111111111');
  await page.click('button[type="submit"]');

  // Wait for the success message to appear
  await page.waitForSelector('text=Created Successfully...');

  // Navigate to the students page
  await page.goto('http://localhost:3000/students');

  // Assert that the URL has changed to /students
  await expect(page).toHaveURL('http://localhost:3000/students');
});
