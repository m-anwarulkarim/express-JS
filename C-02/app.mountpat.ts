/**
 * ===============================================
 * app.mountpath – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * - `app.mountpath` হলো Express.js এর একটি property যা দেখায়
 *   কোন path এ একটি sub-app (router) mount করা হয়েছে।
 *
 * - সাধারণত `express.Router()` বা nested apps তৈরি করার সময় ব্যবহার হয়।
 * - এটা readonly property, কোনো middleware বা route থেকে current mount point জানতে সাহায্য করে।
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
 * 🔎 কী বোঝায়:
 *
 * - এখানে adminRouter কে "/admin" path এ mount করা হয়েছে।
 * - এখন adminRouter.mountpath হবে "/admin"।
 * - এটা route বা middleware থেকে জানতে সাহায্য করে যে, app কোন path এ mount হয়েছে।
 *
 * - app.mountpath মূলত nested apps বা modular apps ব্যবহার করার সময় বেশি কাজে লাগে।
 */
