# 📋 PreEmployment.ph

*A complete guide for first-time job seekers in the Philippines.*

![PreEmployment.ph home page](docs/screenshots/home.png)

---

## 🌟 Overview

**PreEmployment.ph** walks **first-time job seekers** through every pre-employment requirement in the Philippines: what each document is, what it costs, what to bring, and the steps to get it.

It also explains the **First Time Jobseekers Assistance Act (RA 11261)**, which makes most government documents free once, and gives you a checklist you can tick off as you go, on your phone or on paper.

---

## ✨ Features

- **Your brown envelope:** a checklist of the 8 usual documents. Checkmarks are saved on your device.
- **A page for each requirement:** cost, how to get it free, official website, what to bring, steps, tips, and forms
- **Guides:** the RA 11261 free documents rules and the order that saves the most time
- **Search and filters:** find documents by name, or show only online, in-person, free, or not-ready-yet ones
- **Printable checklist:** one page with tickable boxes, ready to print or save as PDF
- **Optional accounts:** sign in with a 6-digit email code (no password) to keep your checklist on any device
- **FAQs and contact:** quick answers, plus a way to report changed fees or steps
- **Built for everyone:** works on small phones and large text sizes, follows dark mode, and works with a keyboard and screen readers

| Requirements, with search and filters | A requirement on a phone | Dark mode |
| --- | --- | --- |
| ![Requirements section](docs/screenshots/requirements.png) | ![NBI clearance page on a phone](docs/screenshots/requirement-mobile.png) | ![Home page in dark mode](docs/screenshots/home-dark.png) |

**Lighthouse scores** (mobile and desktop, home, requirement, and checklist pages): Performance 99–100, Accessibility 100, Best Practices 100, SEO 100.

---

## 🛠 Tech Stack

- **React 19:** component-based UI
- **Vite 7:** fast development server and build
- **Tailwind CSS 4:** styling with design tokens (light, dark, and high-contrast)
- **React Router 8:** a page for each requirement, plus the checklist and account pages
- **Supabase:** sign-in with email codes and a database for saved progress (optional)
- **Sora** (self-hosted with `@fontsource-variable/sora`) for headings, the device's system font for body text

---

## 🚀 Getting Started

You need **Node.js 22.22 or newer** (check with `node -v`).

```bash
git clone https://github.com/DontReb/PreEmployment-ph.git
cd PreEmployment-ph
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with live reload |
| `npm run lint` | Checks the code for mistakes |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built site locally to test it |

---

## ✏️ Updating the Content

All the content lives in `src/data/`, so you rarely need to touch the components:

| File | What's in it |
| --- | --- |
| `src/data/requirements.js` | Each document: cost, free option, official links, what to bring, steps, tips, forms |
| `src/data/guides.js` | The recommended order and the RA 11261 rules |
| `src/data/faqs.js` | Questions and answers |

Fees and processes change. When you re-check them on the official websites, also update `LAST_CHECKED` at the top of `requirements.js`. Every requirement page shows that date.

---

## 📂 Project Structure

```
PreEmployment-ph/
├── public/                  # Copied as-is: favicon, link preview image, robots.txt
├── src/
│   ├── components/          # Navbar, Envelope, sections (Requirements, Guides, FAQs, Contact)
│   │   └── ui/              # Small shared pieces: Icon, CostBadge, ReadyCheckbox
│   ├── data/                # All site content (see "Updating the Content")
│   ├── hooks/               # useActiveSection: highlights the section you're reading
│   ├── account/             # Sign-in state (AuthProvider, useAuth) and the sync status line
│   ├── lib/supabase.js      # Connects to Supabase when its settings exist
│   ├── pages/               # HomePage, RequirementPage, ChecklistPage, AccountPage, NotFoundPage
│   ├── progress/            # Checklist progress: on the device, and in the account when signed in
│   ├── App.jsx              # Layout and routes
│   ├── main.jsx             # Entry point
│   └── styles.css           # Tailwind and design tokens
├── docs/screenshots/        # Images used in this README
├── supabase/schema.sql      # Database table and security rules for accounts
├── .env                     # VITE_SITE_URL, the public address used in link previews
├── vercel.json              # Vercel: lets /requirements/... links work when opened directly
└── index.html               # Page title, description, icons, link preview tags
```

---

## 👤 Setting Up Accounts (optional)

Without this, the site works fine and saves progress on each device only. Accounts let people keep their checklist on any device. It takes about 20 minutes:

1. **Create a project.** Sign up at [supabase.com](https://supabase.com) (free) and create a project. Choose the **Singapore** region, the closest to the Philippines.
2. **Create the database table.** Open **SQL Editor**, paste everything from [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the progress table and the security rules that stop anyone from reading someone else's data.
3. **Connect an email sender (required).** Supabase's built-in sender only delivers to your own team's addresses, and new free projects can't edit email templates until their own sender is connected. Gmail works well and is free (about 500 emails a day):
   - In the Gmail account, turn on **2-Step Verification**, then create an **App password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
   - In Supabase, open **Authentication → Emails → SMTP Settings**, turn on custom SMTP, and enter: host `smtp.gmail.com`, port `587`, username and sender email = the Gmail address, password = the 16-character app password, sender name `PreEmployment.ph`.
4. **Send codes instead of links.** In **Authentication → Emails → Templates**, edit **both** templates: **Confirm signup** (used the first time someone signs in) and **Magic Link** (used after that). Set each subject to `Your PreEmployment.ph sign-in code` and the message to:
   ```html
   <h2>Your PreEmployment.ph code</h2>
   <p>Enter this code to sign in: <strong>{{ .Token }}</strong></p>
   <p>If you didn't ask for this, you can ignore this email.</p>
   ```
5. **Set your site address.** In **Authentication → URL Configuration**, set the **Site URL** to your live address.
6. **Connect the site.** In **Project Settings → API Keys**, copy the **publishable key** (starts with `sb_publishable_`). The **Project URL** is `https://<your-project-id>.supabase.co`, also shown under **Connect** at the top of the dashboard.
   - On your computer: copy `.env.example` to `.env.local`, paste both values, and restart `npm run dev`.
   - On Vercel: **Settings → Environment Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, then redeploy.

Never put the **secret** key (`sb_secret_...`) in the site or in git. The site only needs the publishable key.

**How saving works:** guests' progress stays on their device. When someone signs in, what's on the device and what's in the account are combined, so nothing is lost. Signing out clears the device (useful on shared phones and internet cafés), and people can delete their account and data from the Account page.

---

## 📊 Traffic Dashboard

The site uses **Vercel Web Analytics**: anonymous and cookie-free. To see your traffic, open your project on Vercel and click the **Analytics** tab (click **Enable** the first time). It shows visitors, page views, top pages, where visitors came from, countries, and devices. Visits are only counted on the live site, never during `npm run dev`.

Sign-ups are in Supabase under **Authentication → Users**.

---

## 🌐 Deploying

The site is static, so free hosting works well.

**Vercel (recommended)**
1. Sign in at [vercel.com](https://vercel.com) with GitHub and choose **Add New → Project**.
2. Import `DontReb/PreEmployment-ph`. Vercel detects Vite automatically.
3. Click **Deploy**. Every push to `main` deploys again automatically.

**Netlify** works too: import the repository, set the build command to `npm run build` and the publish directory to `dist`. `public/_redirects` is already set up.

After the first deploy, put your real address in `.env` (`VITE_SITE_URL=...`) so link previews on Facebook and Messenger show the right image.

---

## 🤝 Contributing

Suggestions, corrections, and new guides are welcome:

- Report outdated fees or steps in [Issues](https://github.com/DontReb/PreEmployment-ph/issues)
- Or fork the repository, create a feature branch, and open a pull request

---

## 📜 License

This project is licensed under the MIT License. You’re free to use, modify, and distribute it.

---

## 👨‍💻 Author & Maintainer
Liv Clarence A. Torres
📧 Email: preemploymentph@gmail.com
🌐 [LinkedIn](https://www.linkedin.com/in/liv-clarence-torres-5b8650213/)

_"Every accomplished worker began with a first step. This is yours. Padayon!"_
