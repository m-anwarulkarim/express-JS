/**
 * ===============================================
 * express.urlencoded() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * express.urlencoded() হলো Express.js-এর একটি built-in middleware।
 * এটি মূলত HTML form থেকে আসা URL-encoded data কে
 * JavaScript object এ parse করে এবং req.body তে রাখে।
 *
 * -----------------------------------------------
 * কখন express.urlencoded() দরকার হয়?
 * -----------------------------------------------
 *
 * যখন client HTML form থেকে POST request পাঠায়, তখন form data সাধারণত
 * URL-encoded format এ থাকে। উদাহরণ:
 *
 * name=Anwar&age=20
 *
 * এই data সরাসরি req.body তে ব্যবহার করা যায় না।
 * express.urlencoded() middleware এই data কে parse করে object আকারে req.body তে রাখে।
 *
 * -----------------------------------------------
 * express.urlencoded() কী করে?
 * -----------------------------------------------
 *
 * উদাহরণ:
 * যদি form data হয়: name=Anwar&age=20
 *
 * তাহলে express.urlencoded() middleware এই data কে req.body তে
 * নিচের মতো JavaScript object এ রূপান্তর করবে:
 *
 * req.body = {
 *   name: "Anwar",
 *   age: "20"
 * }
 *
 * -----------------------------------------------
 * গুরুত্বপূর্ণ অপশন:
 * -----------------------------------------------
 *
 * extended: boolean
 *   - extended: true → nested object ও rich data structure support করে
 *   - extended: false → simple key-value pair parse করে
 *
 * -----------------------------------------------
 * এই ক্ষেত্রে সাধারণত সবাই যে ভুলগুলো করে
 * -----------------------------------------------
 *
 * 1) express.json() আগেই বসিয়ে ফেলা
 *
 *    ❌ ভুল:
 *      app.use(express.json());
 *      app.use(express.urlencoded());
 *
 *    অনেক সময় এতে form body আগেই consume হয়ে যায়।
 *
 *    ✅ সঠিক:
 *      app.use(express.urlencoded({ extended: true }));
 *
 * 2) HTML form এ ভুল enctype ব্যবহার করা
 *
 *    অনেকেই `multipart/form-data` ব্যবহার করে
 *    কিন্তু `multer` বা আলাদা middleware ব্যবহার করে না।
 *
 * 3) req.body কে number বা boolean ভেবে নেওয়া
 *
 *    আসলে সব value string হিসেবে আসে:
 *
 *    ❌ ভুল:
 *      const age: number = req.body.age;
 *
 *    ✅ সঠিক:
 *      const age = Number(req.body.age);
 *
 * 4) বড় form পাঠিয়ে limit ভুলে যাওয়া
 *
 *    বড় payload এ error এড়াতে limit সেট করতে হয়:
 *
 *    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে form-urlencoded body handle করবে
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.post("/submit-form", (req: Request, res: Response) => {
  const formData = req.body;
  res.send(`Received form data: ${JSON.stringify(formData)}`);
});

app.listen(3000);
