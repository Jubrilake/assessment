A. Overview
This project offers a streamlined registration process for both students and teachers, organizing their information into a structured table format upon submission. The technology stack utilized for this project is Next.js.

B. Getting Started
To run the code locally, follow these steps:

1. Clone Repository: Begin by cloning the project repository named "assessment" using Git Bash or any preferred command-line tool.
   (git clone [URL])
2. Open in Text Editor: Navigate to the project directory and open it in a text editor (e.g., Visual Studio Code).
3. Ensure Node.js Installation: Verify that Node.js is installed on your computer. If not, download and install it from https://nodejs.org/en/download
4. Install Dependencies: While in the project directory, install the required Node modules by running the following command in your terminal: (npm install).
5. Run the Project: Once the dependencies are installed, execute the code by running the following command:(npm run dev)
   This will launch the application at http://localhost:3000/.

C. User Flow
Here's a brief overview of how the user flow works:

6. Onboarding: The home page serves as the onboarding interface where both students and teachers can register.
7. Successful Registration Alert: Upon successful registration, an alert modal provides feedback to enhance the user experience.
8. View Registered Teachers: To view the list of registered teachers, navigate to http://localhost:3000/teachers.
9. View Registered Students: Similarly, access the list of registered students at http://localhost:3000/students.

D. User Testing
For unit testing, I utilized Playwright, a testing framework that enables automation of Chromium, Firefox, and WebKit browsers through a unified API. Details regarding the implementation can be found in the `/tests/assessment.test.ts` file.
