/**
 * ===============================
 * res.headersSent
 * ===============================
 * ব্যাখ্যা:
 * res.headersSent হলো একটি boolean property যা নির্দেশ করে যে response headers
 * ইতিমধ্যে ক্লায়েন্টে পাঠানো হয়েছে কি না।
 *
 * যখন headers পাঠানো হয়ে যায়, response modify করা সম্ভব নয়। এটি গুরুত্বপূর্ণ
 * কারণ response এর পরে headers বা status পরিবর্তনের চেষ্টা করলে error বা warning আসতে পারে।
 *
 * ব্যবহারের ক্ষেত্র:
 * - middleware বা route এ response আগে পাঠানো হয়েছে কি না তা পরীক্ষা করতে
 * - double send error এড়াতে
 */

import express, { Request, Response } from "express";
const app = express();

/**
 * উদাহরণ ১: সাধারণ route এ headersSent পরীক্ষা
 */
app.get("/check", (req: Request, res: Response) => {
  console.log(res.headersSent); // false, কারণ এখনও response পাঠানো হয়নি
  res.send("Hello World!");
  console.log(res.headersSent); // true, কারণ response পাঠানো হয়েছে
});

/**
 * উদাহরণ ২: middleware এ headersSent পরীক্ষা
 */
app.use((req, res, next) => {
  if (res.headersSent) {
    console.log("Headers already sent, cannot modify response");
  } else {
    res.setHeader("X-Custom-Header", "123");
  }
  next();
});

/**
 * সারসংক্ষেপ:
 * - res.headersSent readonly boolean
 * - true হলে headers ইতিমধ্যেই ক্লায়েন্টে পাঠানো হয়েছে
 * - false হলে response modify করা সম্ভব
 * - official documentation: https://expressjs.com/en/4x/api.html#res.headersSent
 */
