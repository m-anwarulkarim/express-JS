/**
 * ===============================
 * res.locals
 * ===============================
 * ব্যাখ্যা:
 * res.locals হলো একটি object যা route বা middleware এ local variables সংরক্ষণ করতে ব্যবহৃত হয়।
 * এই variables শুধুমাত্র বর্তমান response context এর জন্য প্রযোজ্য এবং template rendering
 * বা পরবর্তী middleware এ access করা যায়।
 *
 * গুরুত্বপূর্ণ বিষয়:
 * - res.locals এর data client এ সরাসরি পাঠানো হয় না, এটি server-side context এ থাকে।
 * - middleware chaining এ shared data pass করতে ব্যবহার করা হয়।
 * - একবার set করা হলে route বা view rendering এ ব্যবহার করা যায়।
 */

import express, { Request, Response, NextFunction } from "express";
const app = express();

/**
 * উদাহরণ ১: middleware এ local variable set করা
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = { id: 1, name: "Admin" };
  next();
});

/**
 * উদাহরণ ২: route এ access করা
 */
app.get("/dashboard", (req: Request, res: Response) => {
  const user = res.locals.user;
  res.send(`Welcome ${user.name}, your ID is ${user.id}`);
});

/**
 * উদাহরণ ৩: template rendering এর জন্য locals ব্যবহার
 */
app.set("view engine", "ejs");
app.get("/profile", (req: Request, res: Response) => {
  // res.locals.user template এ access করা যাবে
  res.render("profile", { pageTitle: "User Profile" });
});

/**
 * সারসংক্ষেপ:
 * - res.locals হলো per-response local storage object
 * - middleware থেকে route বা view এ shared data পাঠাতে ব্যবহার করা হয়
 * - client-side এ সরাসরি পাঠানো হয় না, শুধুমাত্র server-side context এ থাকে
 * - official documentation: https://expressjs.com/en/4x/api.html#res.locals
 */
// 💡 Key Notes:

// res.locals শুধুমাত্র response lifecycle পর্যন্ত থাকে।

// Middleware chaining এ data share করার জন্য সবচেয়ে সুবিধাজনক।
