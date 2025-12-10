/**
 * ===============================================
 * app.mountpath – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * - `app.mountpath` হলো Express.js এর একটি readonly property যা দেখায়
 *   কোন path এ একটি sub-app (router) mount করা হয়েছে।
 *
 * - সাধারণত `express.Router()` বা nested apps তৈরি করার সময় ব্যবহার হয়।
 * - এটি middleware বা route থেকে current mount point জানতে সাহায্য করে।
 *
 * -----------------------------------------------
 * উদাহরণ – Sub-app / Router
 * -----------------------------------------------
 */

// import express, { Request, Response } from "express";

// // Main app
// const app = express();

// // Sub-app (router)
// const adminRouter = express.Router();

// adminRouter.get("/dashboard", (req: Request, res: Response) => {
//   res.send(`Admin Dashboard mounted at: ${adminRouter.mountpath}`);
// });

// // Mount router at /admin
// app.use("/admin", adminRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Main site root");
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 Key Points:
 * -----------------
 * - Sub-app বা router কে কোন path এ mount করা হয়েছে তা জানতে `mountpath` ব্যবহার হয়
 * - Multiple mount points থাকলে এটি array হিসেবে দেখায়
 * - মূলত nested apps বা modular apps ব্যবহার করার সময় বেশি কাজে লাগে
 *
 * 🔎 Common Mistakes:
 * -----------------
 * 1) main app এ `mountpath` check করার চেষ্টা করা (main app এ এটা সবসময় "/" হয়)
 * 2) Sub-app mount করার আগে route access করা
 * 3) Sub-app কে multiple path এ mount করলে ভুল ভাবে expect করা যে mountpath single string হবে
 */
