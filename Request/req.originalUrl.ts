/**
 * ===============================================
 * req.originalUrl – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.originalUrl` হলো Express.js এর request object এর একটি property।
 * - এটি **client যে URL request করেছে**, সেটি পুরোপুরি capture করে।
 * - Middleware বা route এর মধ্যে URL পরিবর্তন হলেও, originalUrl সবসময় আসল request path দেখায়।
 *
 * 2️⃣ req.originalUrl vs req.url vs req.baseUrl:
 * ------------------------------------------------
 * 1. req.originalUrl → Client request এর আসল URL (যে URL browser বা Postman এ টাইপ করা হয়েছে)
 * 2. req.baseUrl → Mounted router বা sub-app এর mount point
 * 3. req.url → Current route বা middleware এ যেটি process হচ্ছে সেই URL (mount point বাদে)
 *
 * উদাহরণ:
 * -------------------
 * ধরো main app এ আমরা adminRouter কে "/admin" path এ mount করেছি:
 *
 * app.use("/admin", adminRouter);
 *
 * এখন client request:
 * http://localhost:3000/admin/dashboard
 *
 * Middleware এ:
 * - req.originalUrl → "/admin/dashboard"
 * - req.baseUrl → "/admin"
 * - req.url → "/dashboard"
 *
 * -----------------------------------------------
 * 3️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

// Sub-router তৈরি করা
const adminRouter = express.Router();

// Middleware যা originalUrl দেখাবে
adminRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Original URL:", req.originalUrl); // "/admin/dashboard"
  console.log("Base URL:", req.baseUrl); // "/admin"
  console.log("Request URL:", req.url); // "/dashboard"
  next();
});

// Route
adminRouter.get("/dashboard", (req: Request, res: Response) => {
  res.send(`Admin Dashboard accessed via: ${req.originalUrl}`);
});

// Router mount করা
app.use("/admin", adminRouter);

// Main route
app.get("/", (req: Request, res: Response) => {
  res.send("Main site root");
});

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 সহজ কথায়:
 * -----------------
 * - req.originalUrl = Client আসল request URL
 * - req.baseUrl = Mounted router path
 * - req.url = Current middleware বা route এর URL
 *
 * Full path = req.baseUrl + req.url
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * 1) req.url এবং req.originalUrl confuse করা → req.url middleware context অনুযায়ী পরিবর্তিত হতে পারে
 * 2) Nested routers হলে originalUrl সবসময় original client URL দেখাবে, কিন্তু url পরিবর্তিত হতে পারে
 * 3) Logging বা redirect decision নেয়ার সময় originalUrl ব্যবহার না করা → ভুল path পাওয়া যেতে পারে
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Mounted routers, middleware বা redirects থাকলেও client আসল URL জানতে চাইলে req.originalUrl ব্যবহার করো
 * - Logging, analytics, redirect বা validation এর জন্য সবচেয়ে নিরাপদ
 */
