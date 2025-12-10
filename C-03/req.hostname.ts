/**
 * ===============================================
 * req.hostname – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * 1️⃣ কীভাবে কাজ করে:
 * -------------------
 * - `req.hostname` হলো Express.js request object এর একটি property।
 * - এটি **client request এ ব্যবহৃত host name** return করে।  
 *   অর্থাৎ ব্রাউজারে typed domain name বা IP address, কিন্তু **port number বাদে**।
 * - এটি HTTP headers থেকে `Host` value পড়ে।  

 * উদাহরণ:
 * -------------------
 * যদি client request হয়:
 * http://localhost:3000/admin/dashboard
 *
 * Middleware এ:
 * - req.hostname → "localhost"
 *
 * আর যদি request হয়:
 * http://example.com:8080/page
 *
 * - req.hostname → "example.com" (port number বাদ)
 *
 * -----------------------------------------------
 * 2️⃣ req.hostname vs req.host vs req.get("host")
 * ------------------------------------------------
 * 1. req.hostname → শুধু hostname, port number বাদ  
 * 2. req.get("host") / req.headers.host → hostname + port (যদি port থাকে)  
 *
 * ⚠️ লক্ষ্য: `trust proxy` সেট করা থাকলে, `X-Forwarded-Host` header ও check করে
 *
 * -----------------------------------------------
 * 3️⃣ ব্যবহার উদাহরণ
 * -----------------------------------------------
 */

import express, { Request, Response, NextFunction } from "express";

const app = express();

// Middleware যা hostname দেখাবে
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Hostname:", req.hostname);
  next();
});

// Route
app.get("/", (req: Request, res: Response) => {
  res.send(`Request came from hostname: ${req.hostname}`);
});

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

/**
 * 🔎 সহজ কথায়:
 * -----------------
 * - req.hostname = যে domain/IP দিয়ে request এসেছে (port বাদ)
 * - URL বা routing এর জন্য hostname অনুযায়ী logic implement করতে পারে
 *
 * -----------------------------------------------
 * 🔎 Common Mistakes:
 * -----------------
 * 1) Port number expect করা → req.hostname port return করে না
 * 2) Proxy বা load balancer থাকলে trust proxy না set করলে ভুল hostname পাওয়া যেতে পারে
 * 3) req.get("host") vs req.hostname confuse করা → get("host") port সহ, hostname শুধু নাম
 *
 * -----------------------------------------------
 * 🔎 শিখার মূল কথা:
 * -----------------
 * - Request আসল কোন host থেকে এসেছে তা জানতে req.hostname ব্যবহার করো
 * - Multi-domain, subdomain বা proxy setup এর ক্ষেত্রে hostname logic দরকার হলে খুব কাজে লাগে
 */
