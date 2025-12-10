/**
 * ===============================================
 * app.engine(ext, callback) – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ Purpose:
 * -----------------
 * - Express.js view/template engine ব্যবহার করে HTML generate করে।
 * - Default engine নেই। ইচ্ছামতো EJS, Pug, Handlebars বা custom engine ব্যবহার করা যায়।
 * - `app.engine()` দিয়ে custom engine register করা হয়, যা নির্দিষ্ট file extension handle করে।
 *
 * 2️⃣ Parameters:
 * -----------------
 * 1. ext (string)
 *    - File extension (যেমন: "ejs", "pug", "hbs", "txt")
 *    - যেকোনো extension ব্যবহার করা যায়, যেমন ".txt" বা ".md"
 *
 * 2. callback (function)
 *    - Rendering logic define করে।
 *    - Signature: callback(filePath, options, callback)
 *      - filePath → template file path
 *      - options → object containing variables/templates values
 *      - callback → function(err, renderedHTML)
 *
 * 3️⃣ Rendering Steps:
 * -----------------
 * - Express যখন res.render() method call করে:
 *    1. filePath থেকে template file read করা হয়
 *    2. options object থেকে variables extract করা হয়
 *    3. template content এর মধ্যে variable placeholders replace করা হয়
 *    4. rendered HTML callback function এর মাধ্যমে return করা হয়
 *
 * 4️⃣ Example – Simple Custom Engine:
 * -----------------
 * - ধরুন ".txt" extension handle করা হবে এবং "{{variable}}" replace করা হবে
 */

import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();

// Custom template engine for ".txt"
app.engine("txt", (filePath: string, options: any, callback: Function) => {
  fs.readFile(filePath, "utf-8", (err, content) => {
    if (err) return callback(err);

    // Replace {{key}} with options[key]
    const rendered = content.replace(
      /{{(\w+)}}/g,
      (_, key) => options[key] || ""
    );

    return callback(null, rendered);
  });
});

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Set default view engine
app.set("view engine", "txt");

// Example route rendering template
app.get("/", (req: Request, res: Response) => {
  res.render("index", { name: "Anwar", age: 20 });
});

/**
 * 5️⃣ Key Points:
 * -----------------
 * - Multiple engines register করা সম্ভব:
 *   app.engine("hbs", hbsEngine);
 *   app.engine("pug", pugEngine);
 * - `app.set("view engine", "ext")` দিয়ে default engine define করা হয়
 *   এবং res.render("file") ঐ engine ব্যবহার করে।
 * - callback function অবশ্যই callback(err, renderedContent) কল করতে হবে, নাহলে response hang হবে।
 *
 * - Practical uses:
 *   - EJS/Pug/Handlebars template integration
 *   - Custom template formats
 *   - Markdown to HTML conversion
 *   - যেকোনো server-side templating requirement
 *
 * 6️⃣ Advantages:
 * -----------------
 * - Flexibility: custom engine তৈরি করা যায়
 * - Separation of concerns: Logic ও Template আলাদা রাখা যায়
 * - Easy integration with res.render()
 *
 * 7️⃣ Common Mistakes:
 * -----------------
 * - callback কল না করা
 * - ভুল file extension ব্যবহার
 * - views folder path ঠিকমতো না দেওয়া
 * - res.render() এ extension লিখে দেওয়া (res.render("index.txt") ❌)
 * - synchronous fs.readFileSync ব্যবহার করে event loop block করা
 * - fs.readFile error properly handle না করা
 */
