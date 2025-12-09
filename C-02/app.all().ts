/**
 * ===============================================
 * app.all() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * - `app.all(path, callback)` হলো Express.js এর একটি route handler।
 * - এটি নির্দিষ্ট path এর জন্য **সব HTTP methods** (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD) handle করতে পারে।
 *
 * - সাধারণত common middleware বা catch-all route তৈরি করার জন্য ব্যবহার হয়।
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express, { Request, Response } from "express";

// const app = express();

// // GET, POST, PUT, DELETE সব HTTP method handle করবে এই route
// app.all("/example", (req: Request, res: Response) => {
//   res.send(`Received ${req.method} request at /example`);
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 কী বোঝায়:
 *
 * - /example path এ GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD request আসলেও
 *   একই callback function run হবে।
 * - req.method দিয়ে কোন HTTP method এসেছে সেটা জানা যাবে।
 *
 * - প্রায়শই common middleware বা catch-all routes (404 handler) তৈরির সময় ব্যবহার হয়।
 */
