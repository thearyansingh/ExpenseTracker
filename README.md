# 🐦 Budgie — Mobile First Expense Tracker App

<div align="center">

![Budgie Banner](./public/logo.png)

### 💸 Track. Manage. Grow.

A modern **mobile-first expense tracker application** built with Next.js, TypeScript, Tailwind CSS, and modern fintech UI principles.

Designed to help users:
- manage budgets
- track expenses
- analyze spending
- monitor financial growth

Inspired by:
**CRED • PhonePe • Modern Banking Apps**

</div>

---

# 🚀 Features

## 🔐 Authentication System

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Flow
- Protected Routes
- Persistent Login

---

## 📊 Dashboard Analytics

- Total Balance Overview
- Monthly Income Tracking
- Expense Analytics
- Budget Progress Tracking
- Recent Transactions
- Interactive Charts

---

## 💰 Budget Management

- Create Budget Categories
- Update Monthly Limits
- Delete Budgets
- Budget Progress Bars
- Overspending Alerts

---

## 🧾 Expense Tracking

- Add Expenses
- Edit Expenses
- Delete Expenses
- Search Expenses
- Filter Expenses
- Pagination & Sorting

---

## 📱 Mobile First UI

- Bottom Navigation
- Floating Action Button
- Fintech Dark Theme
- Smooth Animations
- Glassmorphism UI
- Responsive Mobile Layout

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| shadCN UI | Reusable Components |
| Framer Motion | Animations |
| Zustand | State Management |
| Axios | API Integration |
| Recharts | Charts & Analytics |
| Sonner | Toast Notifications |
| Lucide React | Icons |

---

# 📱 Application Flow

```plaintext
User Opens App
       ↓
Authentication
       ↓
Dashboard Overview
       ↓
Budget Management
       ↓
Expense Tracking
       ↓
Analytics & Insights
```

---

# 🏗️ Project Architecture

```plaintext
src/

├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── budgets/
│   │   ├── expenses/
│   │   ├── profile/
│   │   └── layout.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── auth/
│   ├── dashboard/
│   ├── budget/
│   ├── expense/
│   └── shared/
│
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── dashboard.service.ts
│   ├── budget.service.ts
│   └── expense.service.ts
│
├── store/
│
├── hooks/
├── lib/
├── types/
├── utils/
└── constants/
```

---

# 🌐 Backend Integration

The frontend integrates with an existing backend server using Axios.

---

## 🔐 Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
GET  /api/auth/me
```

---

## 💰 Budget APIs

```http
GET    /api/budgets
POST   /api/budgets
PUT    /api/budgets/:id
DELETE /api/budgets/:id
```

---

## 🧾 Expense APIs

```http
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

---

## 📊 Dashboard APIs

```http
GET /api/dashboard
```

---

# 🔐 Authentication Flow

```plaintext
User Login
     ↓
Backend Validation
     ↓
JWT Token Generated
     ↓
Store Access Token
     ↓
Protected Dashboard Access
```

---

# 🎨 UI/UX Design System

## Theme
- Dark Fintech Theme
- Violet & Indigo Gradients
- Glassmorphism Effects
- Soft Shadows
- Rounded Components

---

## Navigation
- Mobile Bottom Navigation
- Touch Friendly UX
- Smooth Page Transitions

---

## Animations
Powered by Framer Motion:
- Card Hover Effects
- Modal Animations
- Smooth Page Transitions
- Floating Action Button Effects

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

## 2️⃣ Navigate Into Project

```bash
cd budgie
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create:

```plaintext
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 🚀 Run Development Server

```bash
npm run dev
```

Application runs on:

```plaintext
http://localhost:3000
```

---

# 📱 Mobile Testing

Run:

```bash
npm run dev -- --hostname 0.0.0.0
```

Then open:

```plaintext
http://YOUR_LOCAL_IP:3000
```

on your mobile browser.

---

# 🧠 State Management

Budgie uses Zustand for:
- Authentication State
- Budget State
- Expense State
- Dashboard Analytics

---

# 📈 Future Improvements

- AI Expense Insights
- OCR Bill Scanner
- Savings Goals
- Push Notifications
- Multi Currency Support
- Export Reports
- Recurring Expenses

---

# 👨‍💻 Author

## Aryan Singh

Full Stack Developer passionate about:
- MERN Stack
- Fintech Applications
- Modern UI/UX
- Backend Architecture
- Scalable Systems

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🛠️ Contribute improvements

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### 🚀 Budgie — Track. Manage. Grow.

Built with ❤️ using Next.js & TypeScript

</div>
