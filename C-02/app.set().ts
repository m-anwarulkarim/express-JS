/**
 * ===============================================
 * app.set() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * - `app.set(name, value)` হলো Express.js এর একটি method যা
 *   app-এর configuration বা setting define করার জন্য ব্যবহার হয়।
 *
 * - সাধারণত বিভিন্ন built-in বা custom setting এর জন্য ব্যবহার করা হয়।
 *
 * -----------------------------------------------
 * ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

// import express from "express";

// const app = express();

// Template engine set করা
app.set("view engine", "ejs");

// Views folder path set করা
app.set("views", "./views");

// Trust proxy enable করা
app.set("trust proxy", true);

// Custom variable define করা
app.set("myCustomSetting", 12345);

// Get করা
console.log("Template engine:", app.get("view engine")); // ejs
console.log("Views path:", app.get("views")); // ./views
console.log("Trust proxy enabled?", app.get("trust proxy")); // true
console.log("Custom setting:", app.get("myCustomSetting")); // 12345

/**
 * 🔎 কী বোঝায়:
 *
 * - app.set(name, value) → set configuration
 * - app.get(name) → get configuration value
 *
 * সাধারণ built-in settings:
 * - "view engine" → template engine set করা
 * - "views" → views folder path
 * - "trust proxy" → proxy trust control
 * - "case sensitive routing" → route case sensitivity
 * - "strict routing" → trailing slash sensitivity
 * - "x-powered-by" → response header control
 *
 * Custom settings ও define করা যায় যেকোনো নাম ও value দিয়ে।
 */
