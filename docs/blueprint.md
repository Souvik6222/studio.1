# **App Name**: ExpensEye

## Core Features:

- Authentication & Company Setup: Firebase Authentication (Email/Password or Google Sign-in). Auto-create a Company document with the selected country. Make this user the Admin.
- Expense Submission: Employees can submit expense claims with amount, category, description, date, and receipt upload.
- OCR Receipt Data Autofill: Use Firebase ML Kit Text Recognition tool to extract data (amount, date, vendor name) from receipts and auto-fill expense submission fields, stored in Firebase Storage.
- Currency Conversion: Convert expense amount into company’s default currency using the exchangerate API.
- Approval Workflow: Expenses follow a multi-level approval sequence defined by Admin. Each approver gets notified and can approve or reject with comments.
- Conditional Approval Flow: Support percentage, specific approver, and hybrid approval logic. Cloud Function handles conditional logic updates automatically.
- Role-Based Permissions: Admin, Manager, and Employee roles with specific permissions for company, user, and expense management.
- Notifications: Real-time notifications for new approval requests and approval/rejection updates.
- Analytics Dashboard: Show total spend by category, month, or department using charts. Show conversion breakdown if multi-currency used.

## Style Guidelines:

- Primary color: Deep Indigo (#6639A6) to convey trust, security, and reliability.
- Background color: Light gray (#F4F4F8), almost the same hue as deep indigo but heavily desaturated, for a clean and modern look.
- Accent color: Violet (#935CC1), slightly to the left of Indigo on the color wheel, provides contrast for interactive elements and highlights.
- Body font: 'PT Sans', a humanist sans-serif providing a modern and slightly warm feel.
- Headline font: 'Playfair', a modern sans-serif lending elegance to headlines; pair with PT Sans for body text.
- Use a set of consistent icons to represent expense categories, approval status, and other key actions. Icons should be modern and clean.
- Employ a clear and intuitive layout that guides users through each step of expense submission, approval, and analysis. Use white space effectively to reduce clutter.
- Incorporate subtle animations to provide feedback, enhance usability, and create a more engaging user experience.