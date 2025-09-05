# smartassign-continued
SmartAssign – A web app that lets students edit, manage, and export assignments with free and premium export options.

Perfect 🚀 — here’s a copy-paste ready README.md template for your repo, with placeholders for screenshots and a demo GIF. You just need to add image links later.

# 📚 SmartAssign  

**SmartAssign** is a lightweight web app that helps students **edit, manage, and export assignments** quickly and easily, even on low-end devices or unstable internet. Built with **React, Supabase, and IntaSend**, the platform provides both free and premium export options.  

---

## ✨ Demo & Screenshots  

### 🔹 Live Demo  
[👉 View Demo](https://your-live-demo-link.com)  

### 🔹 Screenshots  
| Editor Page | Export Modal | Payment Flow |
|-------------|--------------|--------------|
| ![Editor](./screenshots/editor.png) | ![Export](./screenshots/export.png) | ![Payment](./screenshots/payment.png) |

### 🔹 Demo GIF  
![Demo](./screenshots/demo.gif)  

---

## 🚀 Features  
- ✍️ **Online Assignment Editor** – Word-like editor with live preview.  
- 📤 **Export Options** – Download with watermark (free) or without watermark (premium).  
- 🔐 **Authentication** – Secure login & signup powered by Supabase Auth.  
- 💳 **Payments Integration** – IntaSend API for M-Pesa and card payments (pay-per-assignment or subscriptions).  
- 📊 **Payment Tracking** – Supabase `payments` table with RLS for safe user history access.  
- 🌐 **Optimized for Students** – Works smoothly on mobile devices and in low-resource environments.  
- ⚡ **Supabase Edge Functions** – Secure serverless payment processing (no exposed private keys).  

---

## 🛠️ Tech Stack  
- **Frontend:** React + Vite + TypeScript + TailwindCSS  
- **Backend:** Supabase (Auth, Database, Edge Functions)  
- **Payments:** IntaSend API (M-Pesa, Cards)  
- **Deployment:** Vercel / Netlify (frontend) + Supabase (backend)  

---

## 📂 Project Structure  


/src
├── components # Reusable UI components
├── hooks # Auth and app logic hooks
├── pages # App pages (Editor, Checkout, Success, etc.)
├── services # Supabase + IntaSend API integrations
/functions
├── create-payment # Supabase Edge Function for secure payments


---

## ⚡ Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/smartassign.git
cd smartassign

2. Install dependencies
npm install

3. Set up environment variables

Create a .env.local file in the root with:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

INTASEND_PUBLIC_KEY=your-intasend-public-key
INTASEND_PRIVATE_KEY=your-intasend-private-key

4. Run locally
npm run dev


App will be available at http://localhost:5173 🚀

📊 Database Setup (Supabase)

Run the SQL below in your Supabase SQL Editor to create the payments table:

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  plan_type text NOT NULL CHECK (plan_type IN ('pay_per_doc', 'monthly', 'premium')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  intasend_transaction_id text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service role can manage payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true);

🔮 Future Improvements

📑 PDF export with clean templates

👥 Collaboration (group assignments)

📶 Offline editing mode

🔔 Notifications/reminders for deadlines

📄 License

MIT License © 2025



