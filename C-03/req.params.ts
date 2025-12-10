/**
 * ===============================================
 * req.params – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.params` হলো Express.js request object এর একটি property।
 * - এটি **route parameters** কে object আকারে ধরে রাখে।
 * - Route parameter হলো URL এর সেই অংশ যা `:` দিয়ে define করা হয়।
 *
 * উদাহরণ:
 * -------------------
 * Route: /user/:id
 * Client request: /user/123
 *
 * - req.params → { id: "123" }
 *
 * -----------------------------------------------
 * 2️⃣ Multiple parameters
 * ----------------------
 * Route: /user/:userId/book/:bookId
 * Client request: /user/7/book/42
 *
 * - req.params → { userId: "7", bookId: "42" }
 *
 * -----------------------------------------------
 * 3️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response } from "express";

const app = express();

// Single parameter
app.get("/user/:id", (req: Request, res: Response) => {
  const userId = req.params.id; // "id" route parameter
  res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get("/user/:userId/book/:bookId", (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  res.send(`User ID: ${userId}, Book ID: ${bookId}`);
});

// -----------------------------------------------
/**
 * 🔎 সহজ কথায়:
 * -----------------
 * - req.params = route parameters
 * - সবসময় object আকারে থাকে
 * - URL এর dynamic অংশ access করার জন্য ব্যবহৃত হয়
 *
 * -----------------------------------------------
 * 🔎 Common Uses:
 * -----------------
 * 1) Resource ID / slug access করা (user, post, product)
 * 2) Route-specific logic (validation, database query)
 * 3) Nested resources handle করা
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * 1) req.params expect করা query string → ভুল
 *    - Query string → req.query
 * 2) Parameter name mismatch → req.params.id vs req.params.userId
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Route এর dynamic অংশ access করতে req.params ব্যবহার করো
 * - Object destructuring করলে multiple parameters সহজে access করা যায়
 */
