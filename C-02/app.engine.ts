/**
 * ===============================================
 * app.engine(ext, callback) – আরও বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কি Purpose:
 * -----------------
 * - Express.js মূলত view/template engine ব্যবহার করে HTML generate করে।
 * - Default engine নেই। তুমি চাইলে EJS, Pug, Handlebars বা নিজের custom engine ব্যবহার করতে পারো।
 * - `app.engine()` দিয়ে তুমি **custom engine** register করো, যা নির্দিষ্ট file extension handle করবে।
 *
 * 2️⃣ Parameters:
 * -----------------
 * 1. ext (string)
 *    - File extension (যেমন: "ejs", "pug", "hbs", "txt")
 *    - যেকোনো extension দিতে পারো, যেমন ".txt" বা ".md"
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
 * - Express যখন render() method call করে, তখন:
 *    1. filePath থেকে template file read করা হয়
 *    2. options object থেকে variables extract করা হয়
 *    3. template content এর মধ্যে variable placeholders replace করা হয়
 *    4. rendered HTML callback function এর মাধ্যমে return করা হয়
 *
 * 4️⃣ Example – Simple Custom Engine:
 * -----------------
 * - ধরো তুমি ".txt" extension handle করতে চাও এবং "{{variable}}" replace করবে।
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

// Use custom template engine
app.set("view engine", "txt");

// Example route rendering template
app.get("/", (req: Request, res: Response) => {
  res.render("index", { name: "Anwar", age: 20 });
});

/**
 * 5️⃣ Key Points:
 * -----------------
 * - Multiple engines register করা যায়:
 *   app.engine("hbs", hbsEngine);
 *   app.engine("pug", pugEngine);
 * - `app.set("view engine", "ext")` দিয়ে default engine define করা হয়,
 *   এখন থেকে res.render("file") করলে ঐ engine ব্যবহার হবে।
 * - callback function must call callback(err, renderedContent), নাহলে response hang হবে।
 *
 * - Practical uses:
 *   - EJS/Pug/Handlebars template integration
 *   - Custom template formats
 *   - Markdown to HTML conversion
 *   - Any server-side templating requirement
 *
 * 6️⃣ Advantages:
 * -----------------
 * - Flexibility: নিজের engine বানানো যায়
 * - Separation of concerns: Logic vs Template
 * - Easy integration with res.render()
 */
