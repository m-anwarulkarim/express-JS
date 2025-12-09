/**
 * ===============================================
 * express.static(root, [options]) – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * express.static() হলো Express.js-এর একটি built-in middleware যা
 * static files serve করার জন্য ব্যবহার করা হয়।
 * Static files বলতে বোঝায়:
 *  - HTML, CSS, JavaScript ফাইল
 *  - Images (PNG, JPG, SVG, GIF)
 *  - Fonts, videos, audio
 *
 * -----------------------------------------------
 * root parameter
 * -----------------------------------------------
 *
 * root হলো folder path যা থেকে static files serve করা হবে। উদাহরণ:
 *
 * app.use(express.static("public"));
 *
 * এই ক্ষেত্রে `public` ফোল্ডারের ভিতরের ফাইলগুলো URL path এর মাধ্যমে
 * access করা যাবে। যেমন:
 *  - public/index.html → http://localhost:3000/index.html
 *  - public/css/style.css → http://localhost:3000/css/style.css
 *
 * -----------------------------------------------
 * options (optional)
 * -----------------------------------------------
 *
 * কিছু সাধারণ options:
 *
 * 1. dotfiles: ফাইলের নাম যদি dot দিয়ে শুরু হয় (hidden file)
 *    - 'allow' | 'deny' | 'ignore' (default: 'ignore')
 *
 * 2. etag: Cache validation এর জন্য ETag enable/disable করা যায়
 *
 * 3. maxAge: Cache control – milliseconds বা string format
 *    উদাহরণ: maxAge: "1d" (1 day)
 *
 * 4. index: কোন ফাইলকে index হিসেবে serve করবে (default: 'index.html')
 *
 * 5. redirect: যদি directory path দেওয়া হয়, trailing slash থাকলে redirect হবে কি না
 *
 * আরও option Express.js ডকুমেন্টেশন এ দেখুন
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express from "express";

// const app = express();

// // Middleware হিসেবে public ফোল্ডারের ফাইল serve করবে
// app.use(express.static("public", { maxAge: "1d" }));

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
