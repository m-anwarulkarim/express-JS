/*
 *============================================================
 * ⭐ EXPRESS.JS এ মোট ৫ ধরনের Middleware
 * ============================================================
 *
 * 1) Application-level Middleware (Global Middleware)
 * ---------------------------------------------------
 * - app.use() দিয়ে অ্যাপ লেভেলে ব্যবহার করা হয়।
 * - সব Route এ কাজ করে।
 *
 * Example:
 *    app.use(loggerMiddleware);
 *
 *
 * 2) Router-level Middleware
 * ---------------------------
 * - express.Router() এর ভেতরে ব্যবহার করা হয়।
 * - শুধুমাত্র নির্দিষ্ট router এ কাজ করে।
 *
 * Example:
 *    router.use(authMiddleware);
 *
 *
 * 3) Error-handling Middleware
 * -----------------------------
 * - ৪টি প্যারামিটার থাকে: (err, req, res, next)
 * - কোনো error ঘটলে শুধুমাত্র তখনই কাজ করে।
 *
 * Example:
 *    (err, req, res, next) => { ... }
 *
 *
 * 4) Built-in Middleware
 * -----------------------
 * Express framework নিজে থেকেই দেয়:
 *
 * - express.json()        → JSON body parse করে
 * - express.urlencoded()  → form-data parse করে
 * - express.static()      → static files serve করে
 *
 *
 * 5) Third-party Middleware
 * --------------------------
 * বাইরে থেকে ইন্সটল করা middleware।
 *
 * Example:
 *    - morgan
 *    - cors
 *    - helmet
 *    - cookie-parser
 *
 *
 * ============================================================
 * ⭐ BONUS: আরও ২ ধরনের middleware (ধারণার সুবিধার জন্য)
 * ============================================================
 *
 * 6) Validation Middleware
 * -------------------------
 * - user input ঠিক আছে কি না যাচাই করে।
 *
 *
 * 7) Authentication / Authorization Middleware
 * ---------------------------------------------
 * - user লগইন করেছে কি না (Authentication)
 * - user নির্দিষ্ট রোল আছে কি না (Authorization)
 *
 * */
