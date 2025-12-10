/**
 * =================================================
 * Express.js App Methods & Middleware – Reference
 * =================================================
 *
 * এই ফাইলে দেখানো হয়েছে:
 * - HTTP route methods
 * - Middleware
 * - Built-in body parsers
 * - Static file serving
 * - App configuration methods
 * - Error handling
 *
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

/* =================================================
   1️⃣ Built-in Middleware
   ================================================= */

// JSON body parse
app.use(express.json());

// URL-encoded body parse
app.use(express.urlencoded({ extended: true }));

// Plain text body parse
app.use(express.text({ type: "text/plain" }));

// Raw/binary body parse
app.use(express.raw({ type: "application/octet-stream" }));

// Static files serve
app.use(express.static("public", { maxAge: "1d" }));

/*
 * ❗ Common Mistakes (Built-in Middleware)
 *
 * 1) Body parser order গুলিয়ে ফেলা
 * 2) express.raw / express.text এবং express.json একসাথে ভুলভাবে ব্যবহার
 * 3) Static middleware route এর পরে বসানো
 */

/* =================================================
   2️⃣ HTTP Routes
   ================================================= */

app.get("/get-example", (req: Request, res: Response) => {
  res.send("GET request received");
});

app.post("/post-example", (req: Request, res: Response) => {
  res.json({ message: "POST request received", body: req.body });
});

app.put("/put-example", (req: Request, res: Response) => {
  res.send("PUT request received");
});

app.patch("/patch-example", (req: Request, res: Response) => {
  res.send("PATCH request received");
});

app.delete("/delete-example", (req: Request, res: Response) => {
  res.send("DELETE request received");
});

// All HTTP methods
app.all("/all-example", (req: Request, res: Response) => {
  res.send(`ALL method: ${req.method}`);
});

/*
 * ❗ Common Mistakes (Routes)
 *
 * 1) একই route path duplicate করা
 * 2) async route এ try/catch না ব্যবহার করা
 * 3) response না পাঠিয়ে request pending রাখা
 */

/* =================================================
   3️⃣ Middleware Examples
   ================================================= */

// Global middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Param middleware
app.param(
  "id",
  (req: Request, res: Response, next: NextFunction, id: string) => {
    console.log(`Parameter id = ${id}`);
    next();
  }
);

// Param route
app.get("/user/:id", (req: Request, res: Response) => {
  res.send(`User ID: ${req.params.id}`);
});

/*
 * ❗ Common Mistakes (Middleware)
 *
 * 1) next() call না করা
 * 2) param middleware এ validation না রাখা
 * 3) unnecessary heavy logic middleware এ লেখা
 */

/* =================================================
   4️⃣ App Settings / Configuration
   ================================================= */

app.set("view engine", "ejs");
app.set("trust proxy", true);
app.enable("case sensitive routing");
app.disable("x-powered-by");

console.log(
  "Case sensitive routing enabled?",
  app.enabled("case sensitive routing")
);
console.log("X-Powered-By disabled?", app.disabled("x-powered-by"));

/*
 * ❗ Common Mistakes (Settings)
 *
 * 1) production এ trust proxy ভুলভাবে সেট করা
 * 2) view engine ফাইল configure না করা
 */

/* =================================================
   5️⃣ Error Handling
   ================================================= */

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

/*
 * ❗ Common Mistakes (Error Handling)
 *
 * 1) Error middleware এর 4টা parameter না রাখা
 * 2) async error ধরতে next(err) call না করা
 * 3) 404 handler কে error handler এর আগে বসানো
 */

/* =================================================
   6️⃣ Start Server
   ================================================= */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
