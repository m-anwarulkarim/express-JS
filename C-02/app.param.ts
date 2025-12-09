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
 * callback parameters
 * -----------------------------------------------
 *
 * function callback(req, res, next, value, name) {}
 * - req: request object
 * - res: response object
 * - next: next middleware call করার function
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
 * 🔎 কী বোঝায়:
 *
 * - app.param() parameter-specific middleware তৈরি করে।
 * - Route parameter validate, transform বা attach করার জন্য ব্যবহার হয়।
 * - একবার define করলে যে কোনো route যেখানে parameter আছে সেখানে auto execute হয়।
 */
