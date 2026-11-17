# Magra School Management — Setup and Deployment Guide

> এই নির্দেশিকায় নতুন অপ্টিমাইজড প্রজেক্টটি লোকাল কম্পিউটারে রান করার এবং যেকোনো হোস্টিং সার্ভারে ডেপ্লয় করার বিস্তারিত ধাপ আলোচনা করা হলো।

---

## ১. লোকাল সেটআপ (Local Machine Setup)

### পূর্বশর্ত:
* Node.js (v18 বা তার পরবর্তী ভার্সন)
* PostgreSQL অথবা Supabase অ্যাকাউন্ট

### ধাপ ক: এনভায়রনমেন্ট কনফিগারেশন
1. `backend/` ফোল্ডারে প্রবেশ করুন:
   ```powershell
   cd backend
   ```
2. `.env.example` ফাইলটি কপি করে `.env` তৈরি করুন:
   ```powershell
   Copy-Item .env.example .env
   ```
3. `.env` ফাইলে আপনার ডেটাবেজ ইউআরএল ও সিক্রেট দিন:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/magra_school_db
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
   CORS_ORIGIN=http://localhost:5173
   ```

### ধাপ খ: ডেটাবেজ ইনিশিয়ালাইজেশন
1. আপনার PostgreSQL ডেটাবেজে `database/schema.sql` ফাইলটি এক্সিকিউট করুন।
2. এরপর `database/migrations/` ফোল্ডারের ফাইলগুলো ক্রমানুসারে (006 থেকে 037) রান করুন।
3. ক্লাউড সিঙ্কের প্রয়োজন হলে `database/supabase_schema.sql` রান করতে পারেন।

### ধাপ গ: সার্ভার চালানো
1. ব্যাকএন্ড সার্ভার চালু করতে:
   ```powershell
   cd backend
   npm start
   ```
2. ফ্রন্টএন্ড ডেভেলপমেন্ট সার্ভার চালু করতে (নতুন টার্মিনালে):
   ```powershell
   cd frontend
   npm run dev
   ```
3. ব্রাউজারে `http://localhost:5173` ওপেন করুন।

---

## ২. প্রোডাকশন ডেপ্লয়মেন্ট (Production Deployment)

### ফ্রন্টএন্ড ডেপ্লয়মেন্ট (Vercel, Cloudflare Pages, Netlify বা নিজস্ব হোস্টিং):
1. ফ্রন্টএন্ড প্রোডাকশন বিল্ড তৈরি করুন:
   ```powershell
   cd frontend
   npm run build
   ```
2. বিল্ড সম্পন্ন হলে `frontend/dist/` ফোল্ডারে অপ্টিমাইজড ফাইলগুলো প্রস্তুত হবে।
3. এই `dist/` ফোল্ডারের ভেতরের সমস্ত ফাইল আপনার ওয়েব সার্ভার বা CDN হোস্টিংয়ে আপলোড করুন।
4. **HTTPS বাধ্যতামূলক:** PWA সার্ভিস ওয়ার্কার ক্যাশিংয়ের জন্য সাইটটিতে HTTPS সক্রিয় থাকতে হবে।

### ব্যাকএন্ড ডেপ্লয়মেন্ট (VPS, Railway, Render, বা cPanel Node.js):
1. `backend/` ফোল্ডারটি সার্ভারে আপলোড করুন।
2. প্রোডাকশন এনভায়রনমেন্ট ভেরিয়েবল সেট করুন (`NODE_ENV=production`, সঠিক `CORS_ORIGIN` এবং শক্তিশালী `JWT_SECRET`)।
3. প্রসেস ম্যানেজার দিয়ে সার্ভার রান করুন (যেমন: `pm2 start src/server.js --name magra-backend`).
