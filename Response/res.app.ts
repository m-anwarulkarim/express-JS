/**
 * ===============================
 * res.app
 * ===============================
 * ব্যাখ্যা:
 * res.app হলো বর্তমান Express application instance যা response object এর সাথে সংযুক্ত থাকে।
 * অর্থাৎ, যেকোনো response object থেকে পুরো app instance access করা যায়।
 * এটি তখন কাজে লাগে যখন middleware বা route এর ভিতর app এর configuration,
 * locals, অথবা অন্য কোন property ব্যবহার করতে হয়।
 */

import express, { Request, Response, NextFunction } from "express";
const app = express();

/**
 * app.locals একটি object যেখানে global variables রাখা যায়
 */
app.locals.siteName = "My Awesome Site";

/**
 * Route উদাহরণ:
 * res.app দিয়ে app instance access করা
 */
app.get("/", (req: Request, res: Response) => {
  const site = res.app.locals.siteName; // "My Awesome Site"
  res.send(`Welcome to ${site}`);
});

/**
 * Middleware থেকে app এর property access করা উদাহরণ:
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("App mounted at:", res.app.mountpath);
  next();
});

/**
 * App configuration access করা উদাহরণ:
 */
app.set("title", "Express Demo App");
app.get("/title", (req, res: Response) => {
  const title = res.app.get("title"); // 'Express Demo App'
  res.send(`App Title: ${title}`);
});

/**
 * সারসংক্ষেপ:
 * - res.app হলো পুরো Express app instance
 * - Route বা middleware থেকে global settings, locals বা অন্যান্য app-level properties access করতে ব্যবহৃত হয়
 * - Official documentation: https://expressjs.com/en/4x/api.html#res.app
 */
