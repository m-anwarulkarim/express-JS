/**
 * ===============================================
 * app.param() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * - `app.param(name, callback)` হলো Express.js এর একটি method যা
 *   route parameters এর জন্য middleware define করতে ব্যবহৃত হয়।
 *
 * - যখন কোনো route এ parameter আসে, তখন এই callback function run হয়।
 * - সাধারণত validation, preprocessing, বা parameter data attach করার জন্য ব্যবহার হয়।
 *
 * -----------------------------------------------
 * Callback Parameters
 * -----------------------------------------------
 *
 * function callback(req, res, next, value, name) {}
 * - req: request object
 * - res: response object
 * - next: পরবর্তী middleware call করার function
 * - value: parameter এর value
 * - name: parameter এর নাম (string)
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express, { Request, Response, NextFunction } from "express";

// const app = express();

// // Parameter middleware: userId validate করা
// app.param("userId", (req: Request, res: Response, next: NextFunction, userId: string) => {
//   console.log(`User ID param received: ${userId}`);

//   if (!/^\d+$/.test(userId)) {
//     // যদি numeric না হয়, 400 Bad Request
//     return res.status(400).send("Invalid User ID");
//   }

//   // req.userId attach করা যেতে পারে
//   (req as any).userId = parseInt(userId, 10);
//   next();
// });

// // Route যেখানে parameter use হবে
// app.get("/user/:userId/profile", (req: Request, res: Response) => {
//   const userId = (req as any).userId;
//   res.send(`User profile for ID: ${userId}`);
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 Key Points:
 * -----------------
 * - app.param() parameter-specific middleware তৈরি করে।
 * - Route parameter validate, transform বা attach করার জন্য ব্যবহার হয়।
 * - একবার define করলে যে কোনো route যেখানে parameter আছে সেখানে auto execute হয়।
 *
 * 🔎 Common Mistakes:
 * -----------------
 * 1) Parameter validate না করা → Invalid value দিয়ে route execute হয়
 * 2) next() কল না করা → request hang হয়ে যায়
 * 3) Multiple app.param() middleware conflicting behavior → execution order বুঝে লেখা জরুরি
 * 4) req.body / req.params update না করা → subsequent middleware এ parameter data পাওয়া যাবে না
 */
