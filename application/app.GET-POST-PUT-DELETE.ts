/**
 * ===========================================================
 *   📘 EXPRESS HTTP Methods (app.get, app.post, app.put, app.delete)
 * ===========================================================
 *
 *  এখানে Express.js এর গুরুত্বপূর্ণ HTTP methods (Route Handlers)
 *  বিশদভাবে দেখানো হলো।
 *  শিক্ষার্থীরা এবং ডেভেলপাররা সহজে বুঝতে পারবে।
 *
 * ===========================================================
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

/**
 * ===========================================================
 *  🔥 1) app.get(path, handler)
 * ===========================================================
 *  👉 HTTP GET request handle করে।
 *  👉 মূলত সার্ভার থেকে ডেটা fetch করার জন্য ব্যবহৃত হয়।
 *
 *  উদাহরণ:
 */
app.get("/users", (req: Request, res: Response) => {
  // সমস্ত users fetch করা হয়েছে ধরে নেওয়া হলো
  res.send("GET: All Users");
});

/**
 *  ⚡ Optional features
 *  -------------------
 *  1) Multiple middleware:
 *     app.get('/path', mw1, mw2, handler)
 *
 *  2) Dynamic route parameters:
 *     app.get('/users/:id', (req, res) => { req.params.id })
 *
 *  3) Query parameters:
 *     app.get('/search', (req, res) => { req.query.q })
 */

/**
 * ===========================================================
 *  🔥 2) app.post(path, handler)
 * ===========================================================
 *  👉 HTTP POST request handle করে।
 *  👉 মূলত নতুন ডেটা create করার জন্য ব্যবহৃত হয়।
 *
 *  উদাহরণ:
 */
app.post("/users", (req: Request, res: Response) => {
  // req.body থেকে data নেওয়া হয়
  res.send("POST: Create User");
});

/**
 *  ⚡ Optional features
 *  -------------------
 *  1) JSON parsing middleware দরকার: app.use(express.json())
 *  2) Multiple middleware possible: app.post('/path', mw1, mw2, handler)
 */

/**
 * ===========================================================
 *  🔥 3) app.put(path, handler)
 * ===========================================================
 *  👉 HTTP PUT request handle করে।
 *  👉 মূলত full update এর জন্য ব্যবহৃত হয়
 *     (একটি resource সম্পূর্ণভাবে replace করা হয়)।
 *
 *  উদাহরণ:
 */
app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // Full update operation here
  res.send(`PUT: Update User ${id}`);
});

/**
 * ===========================================================
 *  🔥 4) app.patch(path, handler)
 * ===========================================================
 *  👉 HTTP PATCH request handle করে।
 *  👉 Partial update এর জন্য ব্যবহৃত হয়
 *     (resource এর শুধু কিছু fields update করা হয়)।
 *
 *  উদাহরণ:
 */
app.patch("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // Partial update operation here
  res.send(`PATCH: Partially Update User ${id}`);
});

/**
 * ===========================================================
 *  🔥 5) app.delete(path, handler)
 * ===========================================================
 *  👉 HTTP DELETE request handle করে।
 *  👉 Resource মুছে ফেলার জন্য ব্যবহৃত হয়।
 *
 *  উদাহরণ:
 */
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // Delete operation here
  res.send(`DELETE: Remove User ${id}`);
});

/**
 * ===========================================================
 *  🔥 6) app.all(path, handler)
 * ===========================================================
 *  👉 যেকোনো HTTP method handle করতে পারে
 *  👉 Mostly debugging বা fallback এর জন্য ব্যবহৃত হয়
 */
app.all("/all-methods", (req: Request, res: Response) => {
  res.send(`This route handles ${req.method} requests`);
});

/**
 * ===========================================================
 *  🔥 7) app.route(path)
 * ===========================================================
 *  👉 একই route এ multiple HTTP methods chain করে define করা যায়
 *
 *  উদাহরণ:
 */
app
  .route("/products")
  .get((req: Request, res: Response) => res.send("All Products"))
  .post((req: Request, res: Response) => res.send("Create Product"))
  .put((req: Request, res: Response) => res.send("Update All Products"))
  .delete((req: Request, res: Response) => res.send("Delete All Products"));

/**
 * ===========================================================
 *  🔥 Summary
 * ===========================================================
 *
 *  HTTP Methods (Route Handlers) in Express:
 *
 *  1) app.get(path, handler)      → Read / Fetch data
 *  2) app.post(path, handler)     → Create new resource
 *  3) app.put(path, handler)      → Full update resource
 *  4) app.patch(path, handler)    → Partial update resource
 *  5) app.delete(path, handler)   → Delete resource
 *  6) app.all(path, handler)      → Handle all HTTP methods
 *  7) app.route(path)             → Chain multiple methods on same path
 *
 *  🔹 Optional features:
 *      - Middleware support
 *      - Dynamic route params
 *      - Query parameters
 *      - JSON / Body parsing middleware
 *
 * ===========================================================
 */

export default app;
