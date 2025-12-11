/**
 * ===============================
 * res.render(view [, locals])
 * ===============================
 * ব্যাখ্যা:
 * res.render() ব্যবহার করে server-side template (view engine) কে render করে
 * client-এ HTML response পাঠানো হয়।
 *
 * এটি view engine (যেমন: EJS, Pug, Handlebars) এর সাথে কাজ করে এবং
 * template ফাইলের ভেতরে dynamic data পাঠাতে পারে।
 *
 * Parameters:
 * 1) view (string):
 *    যে template ফাইল render করা হবে (extension ছাড়া নাম দেওয়া যায়)
 *    উদাহরণ: "index" → index.ejs
 *
 * 2) locals (object, optional):
 *    template এর ভেতরে ব্যবহার করার জন্য data object
 *
 * গুরুত্বপূর্ণ বিষয়:
 * - resp.render() নিজে থেকেই response পাঠিয়ে দেয়
 * - Content-Type সাধারণত "text/html"
 */

import express, { Request, Response } from "express";

const app = express();

/**
 * View engine setup (উদাহরণ: EJS)
 */
app.set("view engine", "ejs");

/**
 * Example 1: Simple render
 */
app.get("/home", (req: Request, res: Response) => {
  res.render("home"); // views/home.ejs render হবে
});

/**
 * Example 2: Render with data
 */
app.get("/profile", (req: Request, res: Response) => {
  res.render("profile", {
    username: "Anwarul",
    role: "Developer",
  });
});

/**
 * সারসংক্ষেপ:
 * - res.render() server-side template render করে
 * - Dynamic data template এ পাঠানো যায়
 * - View engine আগে সেট করতে হয় (EJS, Pug, Handlebars)
 * - Official doc: https://expressjs.com/en/4x/api.html#res.render
 */
