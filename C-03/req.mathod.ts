/**
 * ===============================================
 * req.method – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.method` হলো Express.js এর request object এর একটি property।
 * - এটি **HTTP method** (GET, POST, PUT, DELETE, PATCH, OPTIONS ইত্যাদি) return করে।
 * - এটি সবসময় uppercase string হিসেবে পাওয়া যায়।
 *
 * উদাহরণ:
 * -------------------
 * যদি client GET request পাঠায়:
 *   req.method → "GET"
 * যদি client POST request পাঠায়:
 *   req.method → "POST"
 *
 * -----------------------------------------------
 * 2️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

// Middleware যা HTTP method দেখাবে
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("HTTP Method:", req.method);
  next();
});

// Route
app.all("/example", (req: Request, res: Response) => {
  res.send(`Request method is: ${req.method}`);
});

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 সহজ কথায়:
 * -----------------
 * - req.method = Client কোন HTTP method ব্যবহার করেছে
 * - GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
 *
 * -----------------------------------------------
 * 🔎 Common Uses:
 * -----------------
 * 1) Logging → কোন method request করেছে তা log করতে
 * 2) Route handling → একই route এ method অনুযায়ী logic আলাদা করতে
 * 3) Security → শুধুমাত্র নির্দিষ্ট method allow করতে
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * - req.method lowercase expect করা → সবসময় uppercase আসে
 * - query string বা route parameter ধরে HTTP method নির্ধারণ করা → ভুল
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Client কোন HTTP method ব্যবহার করেছে তা জানতে req.method ব্যবহার করো
 * - Middleware, logging বা route logic decision এর জন্য সবচেয়ে সহজ
 */
