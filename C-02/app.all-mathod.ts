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
 * প্রতিটি section comment আকারে ব্যাখ্যা করা আছে।
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

/* =================================================
   1️⃣ Built-in Middleware
   ================================================= */

// JSON body parse
app.use(express.json());

// URL-encoded body parse (HTML forms)
app.use(express.urlencoded({ extended: true }));

// Plain text body parse
app.use(express.text({ type: "text/plain" }));

// Raw/binary body parse
app.use(express.raw({ type: "application/octet-stream" }));

// Static files serve (public folder)
app.use(express.static("public", { maxAge: "1d" }));

/* =================================================
   2️⃣ HTTP Routes
   ================================================= */

// GET request
app.get("/get-example", (req: Request, res: Response) => {
  res.send("GET request received");
});

// POST request
app.post("/post-example", (req: Request, res: Response) => {
  res.json({ message: "POST request received", body: req.body });
});

// PUT request
app.put("/put-example", (req: Request, res: Response) => {
  res.send("PUT request received");
});

// PATCH request
app.patch("/patch-example", (req: Request, res: Response) => {
  res.send("PATCH request received");
});

// DELETE request
app.delete("/delete-example", (req: Request, res: Response) => {
  res.send("DELETE request received");
});

// ALL methods for a route
app.all("/all-example", (req: Request, res: Response) => {
  res.send(`ALL method request: ${req.method}`);
});

/* =================================================
   3️⃣ Middleware Examples
   ================================================= */

// Global middleware example
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Route parameter middleware
app.param(
  "id",
  (req: Request, res: Response, next: NextFunction, id: string) => {
    console.log(`Parameter id = ${id}`);
    next();
  }
);

// Example route with param
app.get("/user/:id", (req: Request, res: Response) => {
  res.send(`User ID: ${req.params.id}`);
});

/* =================================================
   4️⃣ App Settings / Configuration
   ================================================= */

app.set("view engine", "ejs"); // template engine
app.set("trust proxy", true); // trust proxy
app.enable("case sensitive routing"); // enable boolean setting
app.disable("x-powered-by"); // disable default header

console.log(
  "Case sensitive routing enabled?",
  app.enabled("case sensitive routing")
);
console.log("X-Powered-By disabled?", app.disabled("x-powered-by"));

/* =================================================
   5️⃣ Error Handling
   ================================================= */

// Catch-all 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

/* =================================================
   6️⃣ Start Server
   ================================================= */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
