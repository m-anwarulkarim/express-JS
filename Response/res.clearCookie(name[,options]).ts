/**
 * ===============================
 * res.clearCookie(name [, options])
 * ===============================
 * ব্যাখ্যা:
 * res.clearCookie() ব্যবহার করে client-side cookie remove করা হয়।
 * এটি মূলত set করা cookie এর expiration date পূর্ববর্তী করে দেয় এবং browser থেকে cookie delete হয়।
 *
 * Parameters:
 * 1️⃣ name (string) : Cookie এর নাম
 * 2️⃣ options (object, optional) : Cookie remove করার জন্য options
 *    - domain: Cookie যে domain এ valid ছিল
 *    - path: Cookie যে path এ valid ছিল (default: '/')
 *    - httpOnly: true হলে client-side JS access পারবে না
 *    - secure: true হলে শুধু HTTPS এ পাঠানো হবে
 *    - sameSite: 'strict' | 'lax' | 'none'
 *    - signed: true হলে signed cookie clear করা হবে (cookie-parser middleware দরকার)
 *
 * গুরুত্বপূর্ণ:
 * - Cookie clear করার সময় original options match করা উচিত, যা set করার সময় ব্যবহার হয়েছিল
 */

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
const app = express();

// cookie-parser middleware, signed cookie এর জন্য প্রয়োজন
app.use(cookieParser("secret_key"));

/**
 * উদাহরণ ১: সাধারণ cookie clear করা
 */
app.get("/clear-cookie", (req: Request, res: Response) => {
  res.clearCookie("username"); // username cookie remove
  res.send("Cookie cleared: username");
});

/**
 * উদাহরণ ২: options সহ clear করা
 */
app.get("/clear-advanced-cookie", (req: Request, res: Response) => {
  res.clearCookie("sessionId", { path: "/", httpOnly: true, secure: true });
  res.send("Advanced cookie cleared: sessionId");
});

/**
 * উদাহরণ ৩: signed cookie clear করা
 */
app.get("/clear-signed-cookie", (req: Request, res: Response) => {
  res.clearCookie("signedToken", { signed: true, httpOnly: true });
  res.send("Signed cookie cleared: signedToken");
});

/**
 * সারসংক্ষেপ:
 * - res.clearCookie() client-side cookie remove করতে ব্যবহৃত হয়
 * - Cookie remove করার সময় original options match করা উচিত
 * - Signed cookie clear করতে cookie-parser middleware প্রয়োজন
 * - official documentation: https://expressjs.com/en/4x/api.html#res.clearCookie
 */
