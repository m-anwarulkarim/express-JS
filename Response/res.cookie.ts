/**
 * ===============================
 * res.cookie(name, value [, options])
 * ===============================
 * ব্যাখ্যা:
 * res.cookie() ব্যবহার করে HTTP response এ cookie set করা হয়।
 * এটি মূলত client-side এ small data store করার জন্য ব্যবহৃত হয় এবং
 * subsequent requests এ server এ পাঠানো হয়।
 *
 * Parameters:
 * 1️⃣ name (string) : Cookie এর নাম
 * 2️⃣ value (string | object) : Cookie এর value
 *    - যদি value object হয়, তাহলে এটি JSON string এ convert হবে
 * 3️⃣ options (object, optional) : Cookie configuration
 *
 * Options এর মধ্যে সাধারণভাবে ব্যবহার করা হয়:
 * - domain: cookie যে domain এ valid হবে
 * - path: cookie যে path এ valid হবে (default: '/')
 * - maxAge: milliseconds এ cookie এর expiry
 * - expires: Date object, নির্দিষ্ট সময়ের পরে cookie expire হবে
 * - httpOnly: true হলে client-side JavaScript access করতে পারবে না
 * - secure: true হলে cookie শুধু HTTPS এ পাঠানো হবে
 * - sameSite: 'strict' | 'lax' | 'none', CSRF attack প্রতিরোধে
 * - signed: true হলে cookie digitally sign করা হবে (requires cookie-parser)
 *
 * ব্যবহারিক উদাহরণ ও workflow নিচে দেওয়া হলো
 */

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
const app = express();

// cookie-parser middleware add করা জরুরি যদি signed cookie ব্যবহার করতে চাই
app.use(cookieParser("secret_key"));

/**
 * উদাহরণ ১: সাধারণ cookie set করা
 */
app.get("/set-cookie", (req: Request, res: Response) => {
  res.cookie("username", "admin"); // default: path='/', httpOnly=false
  res.send("Cookie set: username=admin");
});

/**
 * উদাহরণ ২: advanced options সহ
 */
app.get("/set-advanced-cookie", (req: Request, res: Response) => {
  res.cookie("sessionId", "abc123", {
    httpOnly: true, // client JS access পারবে না
    secure: true, // শুধুমাত্র HTTPS এ পাঠানো হবে
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: "strict", // CSRF protection
  });
  res.send("Advanced cookie set: sessionId=abc123");
});

/**
 * উদাহরণ ৩: signed cookie set করা
 */
app.get("/set-signed-cookie", (req: Request, res: Response) => {
  res.cookie("signedToken", "secure123", { signed: true, httpOnly: true });
  res.send("Signed cookie set: signedToken");
});

/**
 * সারসংক্ষেপ:
 * - res.cookie() client-side cookie set করতে ব্যবহার হয়
 * - Options ব্যবহার করে security ও lifetime configure করা যায়
 * - Signed cookie ব্যবহার করতে হলে cookie-parser middleware প্রয়োজন
 * - official documentation: https://expressjs.com/en/4x/api.html#res.cookie
 */
