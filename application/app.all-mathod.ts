/**
 * =====================================================================
 *   📘 EXPRESS Application Methods (app.*) — FULL Documentation (Bangla)
 * =====================================================================
 *
 *  এই ফাইলটি Express.js অফিসিয়াল ডকুমেন্টেশন অনুযায়ী তৈরি।
 *  এখানে Express Application (app object) এর সব গুরুত্বপূর্ণ methods,
 *  তাদের কাজ, ব্যবহার এবং example উল্লেখ করা হয়েছে।
 *
 *  NOTE:
 *  -----
 *  app = express() → এই app instance-এর উপরে সব method কাজ করে।
 *
 * =====================================================================
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

/**
 * ===========================================================
 *  🔥 1) app.use(path?, middleware)
 * ===========================================================
 *  👉 Global অথবা path-specific middleware রেজিস্টার করতে ব্যবহৃত হয়।
 *  👉 এটি request lifecycle-এর শুরুতেই execute হয়।
 *
 *  Example:
 *      app.use(express.json());
 *      app.use('/api', apiRouter);
 */
app.use(express.json());

/**
 * ===========================================================
 *  🔥 2) app.get(path, handler)
 *  🔥 3) app.post(path, handler)
 *  🔥 4) app.put(path, handler)
 *  🔥 5) app.delete(path, handler)
 * ===========================================================
 *  👉 HTTP METHODS — browser/server যেভাবে request করে সেই অনুযায়ী কাজ করে।
 *
 *  GET     → ডেটা আনা
 *  POST    → ডেটা তৈরি
 *  PUT     → ডেটা update (full)
 *  PATCH   → ডেটা update (partial)
 *  DELETE  → ডেটা মুছে ফেলা
 */

app.get("/users", (req: Request, res: Response) => {
  res.send("GET: All Users");
});

app.post("/users", (req: Request, res: Response) => {
  res.send("POST: Create User");
});

app.put("/users/:id", (req: Request, res: Response) => {
  res.send(`PUT: Update User ${req.params.id}`);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  res.send(`DELETE: User ${req.params.id}`);
});

/**
 * ===========================================================
 *  🔥 6) app.patch(path, handler)
 * ===========================================================
 *  👉 Partial update এর জন্য ব্যবহৃত হয়।
 */
app.patch("/users/:id", (req: Request, res: Response) => {
  res.send(`PATCH: Partially Updated User ${req.params.id}`);
});

/**
 * ===========================================================
 *  🔥 7) app.all(path, handler)
 * ===========================================================
 *  👉 যেকোনো HTTP method (GET, POST, PUT, ...) এই route handle করবে।
 *  👉 Mostly debugging অথবা fallback এর জন্য ব্যবহৃত হয়।
 */
app.all("/any", (req: Request, res: Response) => {
  res.send("This route handles ALL HTTP methods!");
});

/**
 * ===========================================================
 *  🔥 8) app.route(path)
 * ===========================================================
 *  👉 Chained routing — একই endpoint এ multiple HTTP methods clean ভাবে।
 */
app
  .route("/products")
  .get((req: Request, res: Response) => res.send("All Products"))
  .post((req: Request, res: Response) => res.send("Create Product"));

/**
 * ===========================================================
 *  🔥 9) app.param(name, callback)
 * ===========================================================
 *  👉 Dynamic parameter-এর উপর middleware attach করা।
 *
 *  Example:
 *      /users/:userId → এখানে userId param
 */
app.param(
  "userId",
  (req: Request, res: Response, next: NextFunction, value: string) => {
    console.log("Param middleware:", value);
    next();
  }
);

app.get("/profile/:userId", (req: Request, res: Response) => {
  res.send("User Profile");
});

/**
 * ===========================================================
 *  🔥 10) app.set(name, value)
 *  🔥 11) app.get(name)
 * ===========================================================
 *  👉 Application-level settings।
 *
 *  Example:
 *      app.set("view engine", "ejs");
 */
app.set("title", "My App");
app.get("title"); // => "My App"

/**
 * ===========================================================
 *  🔥 12) app.engine(ext, callback)
 * ===========================================================
 *  👉 Custom template engine রেজিস্টার করা।
 */
app.engine("custom", () => {});

/**
 * ===========================================================
 *  🔥 13) app.listen(port, callback)
 * ===========================================================
 *  👉 Server শুরু করার জন্য ব্যবহৃত হয়।
 */
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

/**
 * ===========================================================
 *  🔥 14) app.disable(setting)
 *  🔥 15) app.disabled(setting)
 *  🔥 16) app.enable(setting)
 *  🔥 17) app.enabled(setting)
 * ===========================================================
 *  👉 Application settings ON / OFF করা।
 *
 *  Example:
 *      app.enable("trust proxy");
 */
app.enable("trust proxy");
app.disable("x-powered-by");

/**
 * ===========================================================
 *  🔥 18) app.locals
 * ===========================================================
 *  👉 Template engine অথবা গ্লোবাল ডেটা store করতে ব্যবহৃত হয়।
 */
app.locals.siteName = "Express Demo";

/**
 * ===========================================================
 *  🔥 19) app.mountpath
 * ===========================================================
 *  👉 অ্যাপ বা রাউটার কোথায় mount হয়েছে সেই path।
 *  (ব্যবহার বেশি কমন নয়, তবে docs-এর অংশ)
 */

/**
 * =====================================================================
 *  ✔ Summary
 *  ---------
 *  এই ফাইলে Express এর Application methods গুলো সম্পূর্ণভাবে দেখানো হলো:
 *
 *  - app.use()
 *  - app.get(), app.post(), app.put(), app.patch(), app.delete()
 *  - app.all()
 *  - app.route()
 *  - app.param()
 *  - app.listen()
 *  - app.set(), app.get()
 *  - app.enable(), app.disable()
 *  - app.locals
 *
 *  এই ফাইল ছাত্রদের পড়ার পাশাপাশি প্রফেশনাল লেভেলের ডেভেলপারদের জন্যও
 *  একটি পূর্ণাঙ্গ রেফারেন্স হিসেবে ব্যবহার করা যাবে।
 *
 * =====================================================================
 */

/**
 * ===========================================================
 *   📘 Express Application Extra Methods (Full Documentation)
 * ===========================================================
 *
 *  এই ফাইলটি Express.js অফিসিয়াল ডক অনুযায়ী তৈরি করা হয়েছে।
 *  এখানে আগের সাধারণ app.* methods ছাড়াও সমস্ত “extra / low-level / internal”
 *  methods নিয়ে বিস্তারিত ব্যাখ্যা দেওয়া হলো।
 *
 *  লক্ষ্য:
 *  ------
 *  - শিক্ষার্থীরা সহজে বুঝতে পারবে
 *  - Developer reference হিসেবে ব্যবহার করা যাবে
 *
 * ===========================================================
 */

/**
 * 🔥 1) app.path()
 * ----------------
 * অ্যাপটির path কী, তা রিটার্ন করে।
 * মূলত mounted router/app এর path বের করতে লাগে।
 */
const appPath = app.path();

/**
 * 🔥 2) app.render(view, options?, callback?)
 * ------------------------------------------
 * View template render করার জন্য ব্যবহৃত হয়।
 * যদি তুমি EJS / Pug / Handlebars ব্যবহার করো — তখন গুরুত্বপূর্ণ।
 *
 * উদাহরণ:
 * app.render('index', { title: 'Home' }, (err, html) => {
 *   if(err) throw err;
 *   console.log(html);
 * });
 */

/**
 * 🔥 3) app.on(event, callback)
 * -----------------------------
 * Express EventEmitter inherits করে —
 * তাই app এ custom events listen করা যায়।
 *
 * উদাহরণ events:
 *  - "mount" → অ্যাপ বা রাউটার mount হলে
 *  - "error" → internal error event (rare)
 */
app.on("mount", () => {
  console.log("Mounted!");
});

/**
 * 🔥 4) app.listen() → return করে http.Server object
 * ---------------------------------------------------
 * Server শুরু করার জন্য ব্যবহৃত হয়।
 * গুরুত্বপূর্ণ তথ্য:
 * - app.listen() আসলে http.createServer(app) রিটার্ন করে
 * - সেই server object দিয়ে socket.io বা WebSocket attach করা যায়
 */
const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

/**
 * 🔥 5) app.emit(eventName, ...args)
 * ----------------------------------
 * Express এর instance দিয়েই event emit করা যায়।
 * কমন না হলেও possible।
 */
app.emit("customEvent", { data: 123 });

/**
 * 🔥 6) app.parent
 * -----------------
 * Nested অ্যাপ / Router ব্যবহার করলে parent অ্যাপ কে নির্দেশ করে।
 *
 * উদাহরণ:
 * const admin = express();
 * const dashboard = express();
 * admin.use('/dashboard', dashboard);
 * console.log(dashboard.parent === admin); // true
 */

/**
 * 🔥 7) app.router
 * -----------------
 * ⚠️ Note: Express v4-এ deprecated
 * তবে ডকুমেন্টেশনে উল্লেখ আছে
 */

/**
 * 🔥 8) app.defaultConfiguration()
 * ---------------------------------
 * ⚠️ Internal method (public use না)
 * Express initialization এ ব্যবহৃত হয়
 */

/**
 * 🔥 9) app.init()
 * -----------------
 * Express নিজেকে initialize করে।
 * এটাও internal API
 */

/**
 * 🔥 10) app.handle(req, res, next)
 * ---------------------------------
 * Very low-level
 * Express নিজস্ব internal request handler
 * Production এ সাধারণ dev use নয়
 */

/**
 * 🔥 11) app.locals.settings
 * --------------------------
 * Application settings store করার জায়গা
 * app.set() এর মান এখানে স্টোর হয়
 */

/**
 * 🔥 12) app.engines
 * ------------------
 * কোন template engine কোন extension এর সাথে mapped তা store হয়
 * Mostly internal but public
 */

/**
 * 🔥 13) app.get() → (Setting getter)
 * -----------------------------------
 * ⚠️ নাম clash:
 * - app.get(path, handler) → route
 * - app.get(setting) → app settings retrieve
 */

/**
 * 🔥 14) app._router (internal API)
 * ---------------------------------
 * Express routing layer এর raw access
 * Production এ ব্যবহার discouraged
 */

export default app;
