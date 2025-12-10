/**
 * ===============================================
 * req.body – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.body` হলো Express.js request object এর একটি property।
 * - এটি **client থেকে POST, PUT, PATCH ইত্যাদি request এর body** ধরে রাখে।
 * - Body data access করার জন্য **middleware** লাগবে, যেমন:
 *    - express.json() → JSON data
 *    - express.urlencoded() → URL-encoded form data
 *    - express.text() → plain text
 *    - express.raw() → raw/binary data
 *
 * -----------------------------------------------
 * 2️⃣ উদাহরণ – JSON body
 * -----------------------------------------------
 */

import express, { Request, Response } from "express";

const app = express();

// Middleware – JSON body parse
app.use(express.json());

// POST route
app.post("/user", (req: Request, res: Response) => {
  const user = req.body; // JSON object
  res.send(`Received user data: ${JSON.stringify(user)}`);
});

/**
 * Client request:
 * POST /user
 * Content-Type: application/json
 * Body:
 * {
 *   "name": "Anwar",
 *   "age": 20
 * }
 *
 * req.body → { name: "Anwar", age: 20 }
 */

// ------------------------
/**
 * 3️⃣ উদাহরণ – URL-encoded form data
 * -----------------------------------
 */

app.use(express.urlencoded({ extended: true }));

app.post("/form-submit", (req: Request, res: Response) => {
  const formData = req.body; // { field1: "value1", field2: "value2" }
  res.send(`Received form data: ${JSON.stringify(formData)}`);
});

/**
 * Client request (HTML form):
 * <form method="POST" action="/form-submit">
 *   <input name="field1" value="value1">
 *   <input name="field2" value="value2">
 * </form>
 *
 * req.body → { field1: "value1", field2: "value2" }
 */
