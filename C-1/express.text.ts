/**
 * ===============================================
 * express.text() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * express.text() হলো Express.js-এর একটি built-in middleware।
 * এটি incoming request body কে plain text হিসেবে parse করে
 * এবং req.body তে সেই text রাখে।
 *
 * -----------------------------------------------
 * কখন express.text() দরকার হয়?
 * -----------------------------------------------
 *
 * যখন client থেকে কোনো plain text পাঠানো হয়, যেমন:
 *  - text/plain Content-Type সহ data
 *  - webhook request যা JSON বা form data নয়
 *  - simple text messages বা logs
 *
 * সাধারণ JSON বা URL-encoded parser text ঠিকভাবে handle করতে পারে না।
 * তখন express.text() ব্যবহার করা হয়।
 *
 * -----------------------------------------------
 * express.text() কী করে?
 * -----------------------------------------------
 *
 * - request body কে plain text হিসেবে পড়ে।
 * - req.body তে সেই plain text রাখে।
 * - Content-Type header অনুযায়ী middleware trigger হয়।
 *   (type option দিয়ে নির্দিষ্ট Content-Type ঠিক করা যায়)
 *
 * -----------------------------------------------
 * সাধারণ options (express.text({ ... })) — যেমন:
 *  - type: কোন Content-Type হলে text parse হবে (default: "text/plain")
 *  - limit: body size limit (যেমন "100kb")
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে plain text body handle করবে
app.use(express.text({ type: "text/plain" }));

app.post("/receive-text", (req: Request, res: Response) => {
  const textData = req.body; // এখানে plain text থাকবে
  res.send(`Received text: ${textData}`);
});

app.listen(3000);
