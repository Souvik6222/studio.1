The Expense Management System is a web-based platform that simplifies how companies handle employee reimbursements and approvals. It replaces manual, time-consuming, and error-prone processes with an automated, transparent, and multi-level approval workflow — all powered by Firebase and a modern React frontend.

🚀 Features
👤 Authentication & User Management

Secure Firebase Authentication (Email/Password or Google Sign-In).

Auto-create a Company and Admin user on first signup.

Admin can:

Add employees and managers.

Assign or change roles.

Define reporting relationships for multi-level approvals.

💰 Expense Submission (Employee Role)

Employees can:

Submit expenses with:

Amount (supports multiple currencies)

Category, Description, and Date

Upload receipts (OCR-enabled)

View their expense history (Pending, Approved, or Rejected).

🧾 OCR Receipt Scanner

Integrated OCR (Optical Character Recognition) automatically extracts details like:

Amount, Date, Vendor name, Expense category

Saves employees time while submitting claims.

🧠 Smart Approval Workflow (Manager/Admin Role)

Managers and Admins can:

View all pending expense requests.

Approve or reject expenses with comments.

Set multi-level approval sequences (Manager → Finance → Director).

Define conditional rules, such as:

✅ 60% of approvers approve → auto-approved.

✅ If CFO approves → expense auto-approved.

✅ Hybrid rules (combining both).
