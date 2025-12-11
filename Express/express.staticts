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
 * 1. dotfiles: hidden file serve করা হবে কিনা
 *    - 'allow' | 'deny' | 'ignore' (default: 'ignore')
 *
 * 2. etag: Cache validation এর জন্য ETag enable/disable
 *
 * 3. maxAge: Cache control – milliseconds বা string format
 *    উদাহরণ: maxAge: "1d"
 *
 * 4. index: কোন ফাইলকে index হিসেবে serve করবে
 *    (default: 'index.html')
 *
 * 5. redirect: directory path এ slash না থাকলে redirect হবে কিনা
 *
 * -----------------------------------------------
 * এই ক্ষেত্রে সাধারণত সবাই যে ভুলগুলো করে
 * -----------------------------------------------
 *
 * 1) ভুল folder path দেওয়া
 *
 *    ❌ ভুল:
 *      app.use(express.static("publc")); // টাইপো
 *
 *    ✅ সঠিক:
 *      app.use(express.static("public"));
 *
 * 2) absolute path ব্যবহার না করা (ডাইনামিক প্রজেক্টে সমস্যা করে)
 *
 *    অনেক সময় project root ঠিকমত resolve হয় না।
 *
 *    ✅ ভালো পদ্ধতি:
 *      import path from "path";
 *      app.use(express.static(path.join(__dirname, "../public")));
 *
 * 3) আগে route বসিয়ে ফেলা
 *
 *    ❌ ভুল:
 *      app.get("/", (req, res) => {...});
 *      app.use(express.static("public"));
 *
 *    এতে static file কখনও serve নাও হতে পারে।
 *
 *    ✅ সঠিক:
 *      app.use(express.static("public"));
 *      app.get("/", ...);
 *
 * 4) Cache issue না বোঝা
 *
 *    অনেকে CSS/JS update করার পর browser এ change দেখতে পায় না
 *    কারণ cache clear করে না।
 *
 *    debug করার সময় cache বন্ধ রাখা ভালো।
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express from "express";
// import path from "path";

// const app = express();

// Middleware হিসেবে public ফোল্ডারের ফাইল serve করবে
// app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
