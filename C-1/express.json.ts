/**
 * ===============================================
 * express.json() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * express.json() হলো Express.js এর একটি Built-in Middleware।
 * এটি মূলত Client (যেমন: Browser, Postman, Frontend App) থেকে
 * আসা JSON data কে JavaScript Object এ convert করার কাজ করে।
 *
 * -----------------------------------------------
 * কেন express.json() ব্যবহার করি?
 * -----------------------------------------------
 *
 * যখন client থেকে request পাঠানো হয়, তখন body অংশটা
 * সাধারণত raw text আকারে আসে।
 *
 * উদাহরণ (Client থেকে পাঠানো JSON):
 *
 * {
 *   "name": "Anwar",
 *   "age": 20
 * }
 *
 * এই data গুলোকে server যেন সহজে ব্যবহার করতে পারে,
 * তার জন্য express.json() middleware প্রয়োজন।
 *
 * এটা automatically নিচের কাজগুলো করে দেয়:
 *  - JSON string কে parse করে
 *  - JavaScript object এ convert করে
 *  - req.body এর ভেতরে সেই data store করে
 *
 * -----------------------------------------------
 * express.json() না ব্যবহার করলে কী হবে?
 * -----------------------------------------------
 *
 * যদি এটা না ব্যবহার করা হয়, তাহলে:
 *
 *  - req.body হবে undefined
 *  - আপনি client থেকে পাঠানো data পাবেন না
 *
 * -----------------------------------------------
 * ব্যবহার করার নিয়ম
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";
const app = express();

// Middleware হিসেবে ব্যবহার
app.use(express.json());

/*
 * -----------------------------------------------
 * বাস্তব উদাহরণ
 * -----------------------------------------------
 */

app.post("/user", (req: Request, res: Response) => {
  // এখানে req.body তে JSON data পাওয়া যাবে
  const user = req.body;
  res.send(user);
});

/*
 * -----------------------------------------------
 * সংক্ষেপে বলা যায়:
 * -----------------------------------------------
 *
 * express.json() কাজ করে:
 *   JSON string  ➜  JavaScript object
 *
 * ফলে আপনি সহজেই req.body দিয়ে client data ব্যবহার করতে পারেন।
 */
