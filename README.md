# Invoice Generator

<h1 align="center">
  
  Invoice Generator
  <br>
</h1>

<p align="center">
  A modern, full-featured invoice generation application built with Next.js, React, and Supabase. Create, manage, and export professional invoices with ease.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#authentication"><strong>Authentication</strong></a>
</p>

---

## 📋 Overview

**Invoice Generator** is a comprehensive web application designed to simplify invoice creation and management. Generate professional invoices, customize them with your branding, and download them as PDF with just a few clicks. Built with modern web technologies and secured with Supabase authentication.

## ✨ Features

### Core Invoice Features
- ✅ **Create & Manage Invoices** - Create new invoices with intuitive form interface
- ✅ **Real-time Preview** - See invoice changes live before saving
- ✅ **Custom Branding** - Upload your company logo to personalize invoices
- ✅ **Line Items Management** - Add, edit, and delete multiple line items with quantities and prices
- ✅ **Multiple Currencies** - Support for various currencies with symbol formatting
- ✅ **PDF Export** - Generate and download professional PDF invoices
- ✅ **Invoice Dashboard** - View, manage, and track all your invoices in one place
- ✅ **Invoice Templates** - Pre-designed templates with professional layouts

### User Features
- ✅ **User Authentication** - Secure login and registration with Supabase
- ✅ **Password Management** - Change password and password recovery functionality
- ✅ **User Sessions** - Cookie-based session management across the entire app
- ✅ **Protected Routes** - Secure dashboard accessible only to authenticated users

### Technical Features
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Dark/Light Theme Support** - Theme toggle with next-themes integration
- ✅ **SSR Ready** - Full server-side rendering support for optimal performance
- ✅ **TypeScript** - Type-safe codebase for reliability and maintainability
- ✅ **Toast Notifications** - User-friendly notifications with Sonner

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful SVG icons
- **Zustand** - Lightweight state management
- **date-fns** - Date formatting and manipulation

### Backend & Database
- **Supabase** - PostgreSQL database with authentication
- **Supabase Auth** - Cookie-based session management
- **supabase-ssr** - SSR-optimized Supabase package

### PDF & Export
- **@react-pdf/renderer** - PDF generation from React components
- **Pako** - Data compression utilities

### UI & Styling
- **Tailwind CSS** - Responsive design
- **next-themes** - Dark mode support
- **Sonner** - Toast notifications
- **Radix UI** - Accessible component primitives

### Development
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account ([Create one here](https://supabase.com))

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd invoice-generator
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### Step 3: Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project credentials:
   - **Project URL**
   - **Anon/Publishable Key**

3. Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Set Up Database Schema

The project includes SQL migrations for setting up the invoice schema. Run the migration script located in `supabase/migrations/001_invoice_schema.sql` in your Supabase dashboard.

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📚 Getting Started

### First Time Users

1. **Sign Up** - Create an account using the sign-up page
2. **Access Dashboard** - View your invoice dashboard after login
3. **Create Invoice** - Click on "New Invoice" to create your first invoice
4. **Customize** - Add your company logo and fill in invoice details
5. **Preview** - Check the real-time preview before saving
6. **Download** - Export as PDF with a single click

### Main Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with invoice creation info |
| `/auth/login` | User login page |
| `/auth/sign-up` | User registration page |
| `/auth/forgot-password` | Password recovery |
| `/dashboard` | Main dashboard with invoice list |
| `/dashboard/invoices/new` | Create new invoice |
| `/dashboard/invoices/[id]` | View/Edit specific invoice |

## 📦 Project Structure

```
invoice-generator/
├── app/                           # Next.js app router
│   ├── auth/                      # Authentication routes
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── callback/
│   ├── dashboard/                 # Dashboard routes
│   │   ├── page.tsx               # Dashboard home
│   │   └── invoices/
│   │       ├── new/               # Create new invoice
│   │       └── [id]/              # View invoice
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles
│
├── components/                    # React components
│   ├── auth/                      # Auth forms
│   │   ├── login-form.tsx
│   │   └── sign-up-form.tsx
│   ├── dashboard/                 # Dashboard components
│   │   ├── invoice-list.tsx
│   │   ├── invoice-content.tsx
│   │   ├── stats-cards.tsx
│   │   └── app-sidebar.tsx
│   ├── invoice/                   # Invoice components
│   │   ├── invoice-form.tsx       # Invoice creation form
│   │   ├── invoice-preview.tsx    # Invoice preview
│   │   ├── invoice-landing.tsx
│   │   ├── line-items-table.tsx   # Line items management
│   │   └── logo-upload.tsx        # Logo upload
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── label.tsx
│   ├
│   ├── footer.tsx
│   └── ads/                       # Ad slots
│
├── hooks/                         # Custom React hooks
│   ├── useInvoiceForm.ts          # Invoice form logic
│   ├── useLineItemsTable.ts       # Line items management
│   ├── useNewInvoicePage.ts       # New invoice page logic
│   ├── useEditInvoicePage.ts      # Edit invoice logic
│   ├── useInvoicePreview.ts       # Preview logic
│   ├── useLoginForm.ts            # Login form logic
│   └── useSignUpForm.ts           # Sign-up form logic
│
├── lib/                           # Utility functions & services
│   ├── invoice-store.ts           # Zustand invoice store
│   ├── invoice-utils.ts           # Invoice utilities
│   ├── pdf-generator.tsx          # PDF generation logic
│   ├── utils.ts                   # General utilities
│   └── supabase/                  # Supabase clients & services
│       ├── client.ts              # Client-side Supabase
│       ├── server.ts              # Server-side Supabase
│       ├── invoices-client.ts     # Invoices client methods
│       ├── invoices-server.ts     # Invoices server methods
│       └── proxy.ts               # Proxy configuration
│
├── types/                         # TypeScript types
│   ├── invoice-types.ts           # Invoice-related types
│   └── dom-to-image-more.d.ts     # Type definitions
│
├── utils/                         # Utility functions
│   ├── showToast.tsx              # Toast notifications
│
├── constant/                      # Constants
│   └── data.ts                    # Application constants
│
├── supabase/                      # Supabase configuration
│   └── migrations/                # Database migrations
│       └── 001_invoice_schema.sql
│
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS config
├── tsconfig.json                  # TypeScript config
├── postcss.config.mjs             # PostCSS config
├── components.json                # shadcn/ui config
├── eslint.config.mjs              # ESLint config
└── package.json                   # Project dependencies

```

## 🔐 Authentication

The app uses **Supabase Auth** with cookie-based sessions, providing:

- **Email/Password Authentication** - Secure user registration and login
- **Session Persistence** - User sessions maintained across page navigations
- **Protected Routes** - Dashboard and invoice pages require authentication
- **Password Recovery** - Forgot password functionality for account recovery
- **Account Management** - Update password and manage account settings

### Authentication Flow

1. User registers via sign-up page
2. Supabase creates user account with email verification
3. User logs in with credentials
4. Session stored securely in HTTP-only cookies
5. User gains access to protected dashboard and invoice features

## 🎨 Design System

The application uses a **60-30-10 color scheme**:
- **60% - Light Background** (#ECEFF1) - Primary background
- **30% - Navy Blue** (#191970) - Headers and primary elements
- **10% - Amber Accent** (#FFC107) - Highlights and CTAs

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues, bug reports, or feature requests, please open an issue in the repository.

---

<p align="center">
  Made with ❤️ for invoice generation
</p>

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
