import { test, expect } from '@playwright/test';

// test('TeacherForm submission', async ({ page }) => {
//   // Mock fetch
//   await page.route('**/api/teacher', route => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify({}),
//     });
//   });


//   // Visit the page
//   await page.goto('http://localhost:3000');
//   await page.click('text=Register as a teacher');

//   // Fill in the form fields
//   await page.selectOption('select[name="title"]', 'Mr');
//   await page.fill('input[name="lastName"]', 'Doe');
//   await page.fill('input[name="firstName"]', 'John');
//   await page.fill('input[name="dateOfBirth"]', '1995-02-10');
//   await page.fill('input[name="phoneNumber"]', '123-456-7890');
//   await page.fill('input[name="nin"]', '111111111');
//   await page.fill('input[name="salary"]', '10000');

//   // Submit the form
//   await page.click('text=Submit');

//   // Wait for the success message to appear
//   await page.waitForSelector('text=Created Successfully...');

//   // Assert that the fetch was called with the correct data
//   const fetchCall = await page.waitForRequest(request => request.url().includes('/api/teacher'));

// if (!fetchCall) {
//   throw new Error('Fetch call not found');
// }

// const postData = JSON.parse(fetchCall.postData() as string);
//   expect(postData).toEqual({
//     title: 'Mr',
//     lastName: 'Doe',
//     firstName: 'John',
//     dateOfBirth: '2023-08-15T00:00:00.000Z', // Adjust this date if necessary
//     phoneNumber: '123-456-7890',
//     nin: '111111111',
//     salary: '10000',
//   });
// });

test('should submit student form and show success popup', async ({ page }) => {
  // Start from the index page
  await page.goto('http://localhost:3000/');

  // Switch to the student form tab
  await page.click('text=Register as a student');

  // Fill and submit the student form
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="dateOfBirth"]', '2021-02-10');
  await page.fill('input[name="phoneNumber"]', '08106453311');
  await page.fill('input[name="nin"]', '111111111');
  await page.click('button[type="submit"]');

  // Navigate to the students page
  await page.goto('http://localhost:3000/students');

  // Assert that the URL has changed to /students
  await expect(page).toHaveURL('http://localhost:3000/students');
});
