/**
 * ===============================================
 * Express.js Locals – app.locals & res.locals
 * ===============================================
 *
 * 1️⃣ app.locals
 * -----------------
 * - Global variables store করার জন্য ব্যবহার হয়।
 * - সব middleware, route, এবং views থেকে access করা যায়।
 * - সাধারণত configuration বা site-wide variables রাখার জন্য ব্যবহার হয়।
 *
 * উদাহরণ:
 * app.locals.siteName = "My Awesome Site";
 * app.locals.author = "Anwar";
 *
 * এখন সব route এবং views থেকে app.locals.siteName / author access করা যাবে।
 *
 * -----------------------------------------------
 * 2️⃣ res.locals
 * -----------------
 * - Response-specific variables store করার জন্য ব্যবহার হয়।
 * - শুধু current request/response এর জন্য থাকবে।
 * - Middleware বা route এর মধ্যে set করা হয় এবং template বা পরবর্তী middleware এ access করা যায়।
 *
 * উদাহরণ:
 * res.locals.user = req.user;
 * res.locals.pageTitle = "Dashboard";
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express, { Request, Response, NextFunction } from "express";

// const app = express();

// // Global variable set
// app.locals.siteName = "My Awesome Site";

// // Middleware example for res.locals
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.locals.currentTime = new Date().toISOString();
//   next();
// });

// app.get("/", (req: Request, res: Response) => {
//   // Access app.locals
//   const siteName = app.locals.siteName;

//   // Access res.locals
//   const time = res.locals.currentTime;

//   res.send(`Welcome to ${siteName}. Current time: ${time}`);
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 সংক্ষেপে:
 *
 * - app.locals → Application-wide variables
 * - res.locals → Request-specific variables
 * - Template rendering (view engine) বা middleware এ খুব কাজে লাগে
 */
