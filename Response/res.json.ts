/**
 * ===============================
 * res.json([body])
 * ===============================
 * ব্যাখ্যা:
 * res.json() ব্যবহার করে HTTP response এ JSON data পাঠানো হয়।
 * এটি Content-Type header কে স্বয়ংক্রিয়ভাবে "application/json" সেট করে এবং
 * JavaScript object বা array কে JSON string এ convert করে client এ পাঠায়।
 *
 * Parameters:
 * - body (any): যে data পাঠাতে হবে। Object, Array, Number, Boolean ইত্যাদি হতে পারে।
 *
 * ব্যবহারিক গুরুত্ব:
 * - REST API responses পাঠাতে সবচেয়ে common method
 * - res.send() ব্যবহার করেও JSON পাঠানো যায়, কিন্তু res.json() স্বয়ংক্রিয়ভাবে
 *   Content-Type set করে এবং data stringify করে
 */

import express, { Request, Response } from "express";
const app = express();

/**
 * উদাহরণ ১: Object response
 */
app.get("/json-object", (req: Request, res: Response) => {
  const data = { id: 1, name: "Admin", role: "superuser" };
  res.json(data);
});

/**
 * উদাহরণ ২: Array response
 */
app.get("/json-array", (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
  ];
  res.json(users);
});

/**
 * উদাহরণ ৩: Status code সহ JSON response
 */
app.get("/json-status", (req: Request, res: Response) => {
  res.status(201).json({ message: "Resource created successfully" });
});

/**
 * সারসংক্ষেপ:
 * - res.json() response body কে JSON format এ পাঠায়
 * - Content-Type header স্বয়ংক্রিয়ভাবে "application/json" set করে
 * - Object, Array, Boolean, Number ইত্যাদি পাঠানো যায়
 * - official documentation: https://expressjs.com/en/4x/api.html#res.json
 */
