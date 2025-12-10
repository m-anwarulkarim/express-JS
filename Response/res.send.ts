/**
 * ===============================
 * res.send([body])
 * ===============================
 * ব্যাখ্যা:
 * res.send() ব্যবহার করে HTTP response পাঠানো হয়।
 * এটি flexible, কারণ body হিসেবে string, Buffer, object বা array পাঠানো যায়।
 * যদি object বা array পাঠানো হয়, তাহলে Express এটি JSON string এ convert করে পাঠায়।
 *
 * Parameters:
 * - body (any, optional): যে data পাঠাতে হবে। String, Buffer, Object, Array ইত্যাদি হতে পারে
 *
 * গুরুত্বপূর্ণ:
 * - res.send() response পাঠায় এবং connection close করে
 * - Content-Type header স্বয়ংক্রিয়ভাবে set করে (string হলে text/html, object হলে application/json)
 * - যদি আগে status code set করা হয় (res.status()), তাহলে সেটি respect করে
 */

import express, { Request, Response } from "express";
const app = express();

/**
 * উদাহরণ ১: String response
 */
app.get("/text", (req: Request, res: Response) => {
  res.send("Hello World!");
});

/**
 * উদাহরণ ২: Buffer response
 */
app.get("/buffer", (req: Request, res: Response) => {
  const buffer = Buffer.from("This is a buffer response");
  res.send(buffer);
});

/**
 * উদাহরণ ৩: Object / Array response (JSON)
 */
app.get("/json", (req: Request, res: Response) => {
  const data = { id: 1, name: "Admin" };
  res.send(data); // Express automatically converts to JSON
});

/**
 * উদাহরণ ৪: Status code সহ response
 */
app.get("/created", (req: Request, res: Response) => {
  res.status(201).send("Resource created successfully");
});

/**
 * সারসংক্ষেপ:
 * - res.send([body]) flexible response পাঠানোর জন্য ব্যবহৃত হয়
 * - String, Buffer, Object, Array ইত্যাদি body হিসেবে পাঠানো যায়
 * - Status code set করা হলে res.status(code).send(body) chainable
 * - Content-Type header স্বয়ংক্রিয়ভাবে set হয়
 * - official documentation: https://expressjs.com/en/4x/api.html#res.send
 */
