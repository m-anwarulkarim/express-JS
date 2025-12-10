/**
 * ===============================
 * res.status(code)
 * ===============================
 * ব্যাখ্যা:
 * res.status() ব্যবহার করে HTTP response এর status code set করা হয়।
 * এটি chainable, অর্থাৎ res.send(), res.json() বা অন্যান্য response methods এর সাথে একসাথে ব্যবহার করা যায়।
 *
 * Parameters:
 * - code (number): HTTP status code (200, 201, 400, 404, 500 ইত্যাদি)
 *
 * গুরুত্বপূর্ণ:
 * - Status code client কে response এর ধরন নির্দেশ করে। যেমন 200 = OK, 404 = Not Found
 * - res.status() alone response পাঠায় না, শুধু code সেট করে। response পাঠাতে res.send(), res.json() ইত্যাদি ব্যবহার করতে হয়।
 */

import express, { Request, Response } from "express";
const app = express();

/**
 * উদাহরণ ১: Status code set এবং send
 */
app.get("/ok", (req: Request, res: Response) => {
  res.status(200).send("Request successful");
});

/**
 * উদাহরণ ২: Status code set এবং JSON response
 */
app.get("/created", (req: Request, res: Response) => {
  res.status(201).json({ message: "Resource created successfully" });
});

/**
 * উদাহরণ ৩: Error status set
 */
app.get("/not-found", (req: Request, res: Response) => {
  res.status(404).json({ error: "Resource not found" });
});

/**
 * সারসংক্ষেপ:
 * - res.status(code) response এর HTTP status code set করে
 * - Chainable: res.status(200).json({...}) বা res.status(404).send(...)
 * - Standalone ব্যবহার করলে response পাঠায় না, শুধু status code set হয়
 * - official documentation: https://expressjs.com/en/4x/api.html#res.status
 */
