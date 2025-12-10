/**
 * ===============================
 * res.redirect([status,] path)
 * ===============================
 * ব্যাখ্যা:
 * res.redirect() ব্যবহার করে client কে অন্য URL বা route এ redirect করা হয়।
 * এটি HTTP response পাঠায় এবং browser automatic নতুন location এ চলে যায়।
 *
 * Parameters:
 * 1️⃣ status (number, optional): HTTP status code
 *    - সাধারণভাবে 302 (Found) default
 *    - 301 (Moved Permanently), 307 (Temporary Redirect), 308 (Permanent Redirect) ইত্যাদি ব্যবহার করা যায়
 * 2️⃣ path (string): Redirect করার target URL বা path
 *
 * গুরুত্বপূর্ণ:
 * - যদি status omitted থাকে, তাহলে default 302 ব্যবহার হয়
 * - Absolute URL বা relative path উভয়ই ব্যবহার করা যায়
 * - Browser redirect হবে এবং current response শেষ হয়ে যাবে
 */

import express, { Request, Response } from "express";
const app = express();

/**
 * উদাহরণ ১: Default redirect (302)
 */
app.get("/old-home", (req: Request, res: Response) => {
  res.redirect("/new-home"); // 302 redirect to /new-home
});

/**
 * উদাহরণ ২: Custom status code (301)
 */
app.get("/old-page", (req: Request, res: Response) => {
  res.redirect(301, "/new-page"); // Permanent redirect
});

/**
 * উদাহরণ ৩: Absolute URL redirect
 */
app.get("/google", (req: Request, res: Response) => {
  res.redirect("https://www.google.com");
});

/**
 * সারসংক্ষেপ:
 * - res.redirect([status,] path) client কে অন্য location এ পাঠায়
 * - Default status code 302, custom status code optional
 * - Absolute বা relative path উভয়ই ব্যবহার করা যায়
 * - official documentation: https://expressjs.com/en/4x/api.html#res.redirect
 */
