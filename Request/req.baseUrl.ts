/**...
 * ===============================================
 * req.baseUrl – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - যখন  Express.js এ sub-router (Router) ব্যবহার করা হয় বা কোন app কে
 *   একটি specific path এ mount করা হয়, তখন সেই path কে বলা হয় **mount point**।
 * - `req.baseUrl` সেই mounted path কে store করে।
 * - এটি **route এর current path নয়**, শুধু router বা app যে path এ mount হয়েছে তা দেখায়।
 *
 * উদাহরণ:
 * -------------------
 *  main app এ আমরা adminRouter কে "/admin" path এ mount করেছি:
 *
 * app.use("/admin", adminRouter);
 *
 * এখন adminRouter এর route গুলোতে:
 *   req.baseUrl → "/admin"
 * আর req.url → "/dashboard" (route এর নিজস্ব path)
 *
 * -------------------
 * Full URL path হবে:
 * req.baseUrl + req.url → "/admin/dashboard"
 *
 * -----------------------------------------------
 * 2️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response } from "express";

const app = express();

// Sub-router তৈরি করা
const adminRouter = express.Router();

// Middleware যা baseUrl দেখাবে
adminRouter.use((req: Request, res: Response, next: Function) => {
  console.log("Base URL:", req.baseUrl); // উদাহরণ: "/admin"
  console.log("Request URL:", req.url); // উদাহরণ: "/dashboard"
  next();
});

// Route
adminRouter.get("/dashboard", (req: Request, res: Response) => {
  res.send(`Admin Dashboard mounted at: ${req.baseUrl}`);
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
 * - req.baseUrl = Router বা sub-app যেই path এ mount করা আছে
 * - req.url = সেই route এর নিজের path
 * - req.baseUrl + req.url = Full path যা client request করেছে
 *
 * -----------------------------------------------
 * 🔎 সহজ উদাহরণ:
 *
 * যদি কেউ ব্রাউজারে টাইপ করে:
 * http://localhost:3000/admin/dashboard
 *
 * তাহলে:
 * - req.baseUrl → "/admin"
 * - req.url → "/dashboard"
 * - Full path → "/admin/dashboard"
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * 1) Main app route এ req.baseUrl expect করা → এটা সবসময় "" বা "/" হবে
 * 2) req.baseUrl আর req.url confuse করা → baseUrl শুধু mount path দেখায়, url সম্পূর্ণ request path
 * 3) Multiple nested routers থাকলে, baseUrl cumulative হতে পারে
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Mounted routers এর context বোঝার জন্য req.baseUrl ব্যবহার করা হয়
 * - Middleware বা route handler এ dynamic routing বা logging এর জন্য খুব কাজে লাগে
 */
