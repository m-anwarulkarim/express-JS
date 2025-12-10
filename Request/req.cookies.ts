/**
 * ===============================================
 * req.cookies – বিস্তারিত ব্যাখ্যা (Express.js)
 * ===============================================
 *
 * 1️⃣ req.cookies কী?
 * -----------------
 * - Client browser থেকে পাঠানো **cookies** ধরে রাখে।
 * - সাধারণত **cookie-parser middleware** ব্যবহার করে parse করা হয়।
 * - Cookie data একটা object আকারে থাকে: key → value
 * - যেকোনো route বা middleware থেকে access করা যায়।
 *
 * -----------------------------------------------
 * 2️⃣ Middleware দরকার
 * ---------------------
 */

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();

// cookie-parser middleware enable
app.use(cookieParser());

/**
 * -----------------------------------------------
 * 3️⃣ Example – Accessing Cookies
 * -----------------------------------------------
 *
 * Suppose client পাঠিয়েছে cookies:
 *   myToken=abc123; theme=dark
 */
app.get("/show-cookies", (req: Request, res: Response) => {
  console.log(req.cookies);
  // Output: { myToken: "abc123", theme: "dark" }

  const myToken = req.cookies.myToken;
  const theme = req.cookies.theme;

  res.send(`Token: ${myToken}, Theme: ${theme}`);
});

/**
 * -----------------------------------------------
 * 4️⃣ Example – Setting Cookies (Server Side)
 * -----------------------------------------------
 */
app.get("/set-cookie", (req: Request, res: Response) => {
  // set a simple cookie
  res.cookie("username", "Anwar", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // 1 day
  res.send("Cookie has been set!");
});

/**
 * 🔎 Key Points:
 * -----------------
 * 1. Middleware দরকার: `cookie-parser`
 * 2. Access করতে: `req.cookies.cookieName`
 * 3. Cookies object → key-value pair
 * 4. Cookie set করতে → `res.cookie(name, value, options)`
 * 5. Common options:
 *    - httpOnly → Client-side JS access restricted
 *    - maxAge → Expiration time
 *    - secure → HTTPS only
 *    - path → Cookie path
 */

/**
 * -----------------------------------------------
 * 5️⃣ Start Server
 * -----------------------------------------------
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
