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
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে form-urlencoded body handle করবে
app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", (req: Request, res: Response) => {
  const formData = req.body; // এখানে parsed form data থাকবে
  res.send(`Received form data: ${JSON.stringify(formData)}`);
});

app.listen(3000);
