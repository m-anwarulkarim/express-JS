/**
 * ===============================================
 * req.path – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.path` হলো Express.js request object এর একটি property।
 * - এটি client request এর **URL path** কে return করে, কিন্তু query string বাদ দিয়ে।
 * - Mounted routers বা middleware context অনুযায়ী এই path adjust হতে পারে না; সবসময় current route এর relative path দেখায়।
 *
 * 2️⃣ req.path vs req.url vs req.originalUrl vs req.baseUrl:
 * ----------------------------------------------------------
 * 1. req.originalUrl → Client যে URL request করেছে, পুরোটা (query string সহ)
 * 2. req.baseUrl → Mounted router বা sub-app এর mount point
 * 3. req.url → Current middleware/route context এর URL (query string আছে)
 * 4. req.path → URL path অংশ, query string বাদে
 *
 * উদাহরণ:
 * -------------------
 * ধরো client request:
 * http://localhost:3000/admin/dashboard?sort=asc
 *
 * Middleware এ:
 * - req.originalUrl → "/admin/dashboard?sort=asc"
 * - req.baseUrl → "/admin"
 * - req.url → "/dashboard?sort=asc"
 * - req.path → "/dashboard"
 *
 * -----------------------------------------------
 * 3️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

// Sub-router তৈরি করা
const adminRouter = express.Router();

// Middleware যা path দেখাবে
adminRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Original URL:", req.originalUrl); // "/admin/dashboard?sort=asc"
  console.log("Base URL:", req.baseUrl); // "/admin"
  console.log("Request URL:", req.url); // "/dashboard?sort=asc"
  console.log("Path:", req.path); // "/dashboard"
  next();
});

// Route
adminRouter.get("/dashboard", (req: Request, res: Response) => {
  res.send(`Current path: ${req.path}`);
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
 * - req.path = URL এর শুধু path অংশ (query string বাদে)
 * - Mounted router বা middleware context অনুযায়ী adjust হয় না
 * - URL analysis, route validation, logging ইত্যাদিতে ব্যবহার হয়
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * 1) Query string expect করা → req.path query string remove করে দেয়
 * 2) req.url এবং req.path confuse করা → req.url query string সহ আসে, path শুধু path অংশ দেখায়
 * 3) Nested routers multiple level → req.path সবসময় relative route path দেখায়, mount point নয়
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Path-only information লাগলে req.path ব্যবহার করো
 * - Query string দরকার হলে req.url বা req.originalUrl ব্যবহার করো
 */
