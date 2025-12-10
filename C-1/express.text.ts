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
 * সাধারণ options (express.text({ ... }))
 * -----------------------------------------------
 *
 *  - type: কোন Content-Type হলে text parse হবে
 *    (default: "text/plain")
 *
 *  - limit: body size limit (যেমন "100kb")
 *
 * -----------------------------------------------
 * এই ক্ষেত্রে সাধারণত সবাই যে ভুলগুলো করে
 * -----------------------------------------------
 *
 * 1) express.json() আগেই ব্যবহার করা
 *
 *    JSON middleware আগে বসালে অনেক সময় text body
 *    আগেই consume হয়ে যায়।
 *
 *    ✅ ভালো পদ্ধতি:
 *      app.use(express.text());
 *
 * 2) Client থেকে ভুল Content-Type পাঠানো
 *
 *    অনেক সময়:
 *      Content-Type: application/json
 *    দিয়ে plain text পাঠানো হয়, ফলে middleware কাজ করে না।
 *
 * 3) req.body কে object ভেবে ব্যবহার করা
 *
 *    ❌ ভুল:
 *      console.log(req.body.message);
 *
 *    ✅ সঠিক:
 *      console.log(req.body); // এটা string
 *
 * 4) বড় text পাঠিয়ে limit ভুলে যাওয়া
 *
 *    Default limit ছোট থাকে, বড় data এ error হতে পারে।
 *
 *    ✅ সমাধান:
 *      app.use(express.text({ limit: "1mb" }));
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে plain text body handle করবে
app.use(
  express.text({
    type: "text/plain",
    limit: "1mb",
  })
);

app.post("/receive-text", (req: Request, res: Response) => {
  const textData = req.body; // এখানে plain text থাকবে
  res.send(`Received text: ${textData}`);
});

app.listen(3000);
