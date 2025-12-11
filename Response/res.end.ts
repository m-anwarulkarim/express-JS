/**
 * ===============================
 * res.end([data])
 * ===============================
 * ব্যাখ্যা:
 * res.end() ব্যবহার করে HTTP response শেষ (terminate) করা হয়।
 * এটি response stream বন্ধ করে দেয় এবং এর পরে আর কোন data পাঠানো যায় না।
 *
 * এটি Node.js এর native "http.ServerResponse.end()" মেথডের উপর ভিত্তি করে তৈরি।
 *
 * Parameters:
 * - data (optional): শেষ response হিসেবে পাঠানো হবে এমন string বা Buffer
 *
 * গুরুত্বপূর্ণ বিষয়:
 * - res.end() কল করার পরে আর res.send(), res.json() বা অন্য কোনো
 *   response method ব্যবহার করা যাবে না।
 * - এটি low-level control এর জন্য বেশি ব্যবহৃত হয়।
 */

import express, { Request, Response } from "express";

const app = express();

/**
 * উদাহরণ ১: Simple response end
 */
app.get("/end-simple", (req: Request, res: Response) => {
  res.end("Response finished");
});

/**
 * উদাহরণ ২: কোনো body ছাড়াই response শেষ করা
 */
app.get("/end-empty", (req: Request, res: Response) => {
  res.status(204);
  res.end();
});

/**
 * উদাহরণ ৩: Buffer data সহ response শেষ
 */
app.get("/end-buffer", (req: Request, res: Response) => {
  const data = Buffer.from("Binary data response");
  res.end(data);
});

/**
 * সারসংক্ষেপ:
 * - res.end() response সম্পূর্ণরূপে বন্ধ করে দেয়
 * - Optional data পাঠানো যায় (string বা Buffer)
 * - এরপর কোনো response method কাজ করবে না
 * - Official doc: https://expressjs.com/en/4x/api.html#res.end
 */
