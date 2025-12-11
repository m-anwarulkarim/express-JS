/**
 * ===========================================================
 *  📘 express.Router([options]) - Full Documentation (Bangla)
 * ===========================================================
 *
 *  Express এর অফিসিয়াল ডকুমেন্টেশন অনুযায়ী এখানে Router সম্পর্কে
 *  সব কিছু পরিষ্কারভাবে ব্যাখ্যা করা হলো।
 *
 *  🔥 express.Router কী?
 *  -----------------------
 *  express.Router() হলো একটি mini application বা ছোট app instance।
 *  এটি মূলত routes এবং middleware গুলোকে আলাদা ভাবে modular আকারে
 *  সংগঠিত করতে ব্যবহৃত হয়।
 *
 *  এই Router-এর নিজস্ব:
 *  - Routes (GET, POST, PUT, DELETE)
 *  - Middleware
 *  - Path
 *  - Param
 *  - Error Handler
 *
 *  মূল অ্যাপ্লিকেশনকে পরিষ্কার এবং maintainable রাখতে Router খুবই গুরুত্বপূর্ণ।
 *
 *
 *  ===========================================================
 *  🧩 express.Router Options
 *  ===========================================================
 *
 *  express.Router([options]) এ তিনটি optional settings থাকে:
 *
 *
 *  1️⃣ caseSensitive: boolean (default: false)
 *  -------------------------------------------
 *  👉 URL path এর ক্ষেত্রে case-sensitive হবে কিনা।
 *
 *  যদি false (default):
 *      "/User" এবং "/user" → একই route
 *
 *  যদি true:
 *      "/User" এবং "/user" → আলাদা route হিসাবে ধরবে।
 *
 *
 *  2️⃣ mergeParams: boolean (default: false)
 *  -----------------------------------------
 *  👉 Parent route-এর parameters child router-এ merge হবে কিনা।
 *
 *  উদাহরণ:
 *      app.use('/users/:userId/posts', postRouter);
 *
 *  যদি mergeParams: false → postRouter req.params.userId পাবে না।
 *  যদি mergeParams: true  → postRouter req.params.userId পাবেন।
 *
 *
 *  3️⃣ strict: boolean (default: false)
 *  ------------------------------------
 *  👉 URL-এর শেষে slash থাকলে route আলাদা গণ্য হবে কিনা।
 *
 *  যদি false:
 *      "/user/" এবং "/user" → একই route
 *
 *  যদি true:
 *      "/user/" এবং "/user" → আলাদা route
 *
 *
 *  ===========================================================
 *  ⚙️ Router Methods (যা যা করা যায়)
 *  ===========================================================
 *
 *  1. router.use() → middleware যোগ করা
 *  2. router.get(), router.post(), router.put(), router.delete() ইত্যাদি route তৈরি করা
 *  3. router.param() → param ভিত্তিক middleware
 *  4. Nested Router → router এর ভিতরে আরেক router
 *  5. Error-handling middleware
 *
 *
 *  ===========================================================
 *  🧪 Practical Example (TypeScript)
 *  ===========================================================
 */

import express, { Request, Response, NextFunction } from "express";

// Router with options
const userRouter = express.Router({
  caseSensitive: false,
  mergeParams: true,
  strict: false,
});

// Middleware example
userRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log("User Router Middleware চললো!");
  next();
});

// Route example
userRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "All Users List" });
});

// Dynamic route with params
userRouter.get("/:userId", (req: Request, res: Response) => {
  res.json({
    message: "Single User Info",
    userId: req.params.userId,
  });
});

// Export router
export default userRouter;

/**
 *  ===========================================================
 *  📌 Summary (এক নজরে)
 *  ===========================================================
 *
 *  ✔ express.Router() = mini express app
 *  ✔ Modular routes → বড় project clean রাখে
 *  ✔ caseSensitive → URL case control
 *  ✔ mergeParams → parent params child router-এ পাঠায়
 *  ✔ strict → trailing slash strict করে
 *
 *  এই ফাইল developers স্টুডেন্টদের জন্য উপযুক্ত ব্যাখ্যা সহ তৈরি।
 *
 * ===========================================================
 */
