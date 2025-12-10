# **Express Cheat Sheet + Setup Guide**

---

⚠️ **Important Notes**

- এখানে সংক্ষেপে সবকিছু দেওয়া হয়েছে।
- GitHub এর ভিতরে গেলে সব বিস্তারিত দেখতে পারবে।
- এখানে প্রয়োজনীয় সবকিছু **পুরোপুরি ইন্সটল করা হয়নি**, যার কারণে কেউ পরে ফাইল চালালে বা রান করলে কিছু এরর দেখতে পারেন।
- বাস্তবে সবকিছু ঠিক আছে, কোথায় কি করতে হবে সব বলা হয়েছে।
- যেহেতু সবকিছু ইন্সটল করা হয়নি, তাই কিছু এরর আসা স্বাভাবিক। তবে কি কি install করতে হবে বলে দিয়া হয়েছে
- সবকিছু আপডেট করা হয়নি; ধীরে ধীরে সবকিছু আপডেট হয়ে যাবে।

---

# 🛠️ Express.js + TypeScript Cheat Sheet & Setup Guide

এই README তে তুমি পাবো:

1️⃣ Express + TypeScript প্রজেক্ট সেটআপের ধাপ  
2️⃣ Express Cheat Sheet (app, router, req, res)  
3️⃣ ছোট উদাহরণসহ সবকিছু

---

## 1️⃣ প্রজেক্ট সেটআপ

### Step 1: প্রজেক্ট ইনিশিয়ালাইজ করা

**Command:**

```bash
npm init -y
```

**কাজ:**

- package.json ফাইল তৈরি করবে
- প্রজেক্ট শুরু হবে

---

### Step 2: Express ইনস্টল

**Command:**

```bash
npm install express
```

**কাজ:**

- Express framework ইনস্টল হবে
- package.json এর "dependencies" এ যোগ হবে

---

### Step 3: TypeScript ইনস্টল (dev dependency)

**Command:**

```bash
npm install -D typescript
```

**কাজ:**

- TypeScript compiler ইনস্টল হবে
- .ts ফাইল লেখার জন্য দরকার

---

### Step 4: tsconfig.json তৈরি করা

**Command:**

```bash
npx tsc --init
```

**কাজ:**

- TypeScript কনফিগারেশন ফাইল তৈরি করবে
- .ts কে .js এ compile করার জন্য দরকার

---

### Step 5: tsconfig.json পরিবর্তন (ছোট প্রজেক্টের জন্য)

**কাজ:**

- "rootDir" এবং "outDir" comment করা যাবে
- অন্য সেটিংস ডিফল্ট রাখা যাবে

**কেন দরকার:**

- ফোল্ডার structure সরল হয় ছোট প্রজেক্টের জন্য

---

### Step 6: Express types ইনস্টল

**Command:**

```bash
npm install -D @types/express
```

**কাজ:**

- Express এর TypeScript type definitions দেয়
- IntelliSense এবং type-checking সুবিধা দেয়

---

### Step 7: TSX ইনস্টল (dev dependency)

**Command:**

```bash
npm install -D tsx
```

**কাজ:**

- TypeScript ফাইল সরাসরি রান করতে পারবে
- watch mode দিয়ে auto reload সুবিধা দেয়

---

### Step 8: package.json dev script যোগ

```json
"scripts": {
  "dev": "tsx watch server.ts"
}
```

**কাজ:**

- watch mode এ server চালাবে
- ফাইল পরিবর্তনে auto reload হবে

---

### ব্যবহার

- ডেভেলপমেন্ট সার্ভার চালাতে:

```bash
npm run dev
```

- ম্যানুয়ালি compile করতে (ঐচ্ছিক):

```bash
npx tsc
```

- Production এ compiled JS চালাতে:

```bash
node dist/server.js
```

---

## 2️⃣ Express Cheat Sheet

### 2.1 App Methods

```ts
app.use(path?, middleware)    // Middleware attach করে
app.get(path, handler)        // GET request handle করে
app.post(path, handler)       // POST request handle করে
app.put(path, handler)        // PUT request handle করে
app.delete(path, handler)     // DELETE request handle করে
app.patch(path, handler)      // PATCH request handle করে
app.all(path, handler)        // সব HTTP method handle করে
app.route(path)               // Route chaining
app.listen(port, callback)    // Server run করে
app.set(name, value)          // Configuration set
app.get(name)                 // Configuration get
app.engine(ext, callback)     // Template engine register
app.param(param, callback)    // Route parameter process
```

**Example:**

```ts
app.all("/secret", (req, res) => res.send("All methods work here!"));

app
  .route("/user/:id")
  .get((req, res) => res.send(`Get user ${req.params.id}`))
  .put((req, res) => res.send(`Update user ${req.params.id}`));
```

---

### 2.2 Response Object (res)

```ts
res.send(body); // HTML, JSON, Buffer
res.json(obj); // JSON response
res.sendStatus(code); // Status + message
res.status(code); // Status set
res.set(field, val); // Header set
res.get(field); // Header read
res.cookie(name, val); // Cookie set
res.clearCookie(name); // Cookie remove
res.redirect(url); // Redirect
res.render(view, locals); // Template render
res.download(file); // File download
res.sendFile(file); // File serve
res.append(field, val); // Append header
res.type(type); // Content-Type set
res.location(path); // Location header
res.vary(field); // Vary header
res.locals; // Local variables
```

**Example:**

```ts
app.get("/json", (req, res) => res.status(200).json({ msg: "Success" }));
app.get("/download", (req, res) => res.download("./files/report.pdf"));
app.get("/redirect", (req, res) => res.redirect("/home"));
```

---

### 2.3 Request Object (req)

```ts
req.body;
req.query;
req.params;
req.cookies;
req.signedCookies;
req.hostname;
req.ip;
req.method;
req.originalUrl;
req.path;
req.protocol;
req.secure;
req.route;
req.app;
```

**Example:**

```ts
app.post("/user/:id", (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  res.send(`Received data for user ${userId}`);
});
```

---

### 2.4 Router

```ts
const router = express.Router();

router.get(path, handler);
router.post(path, handler);
router.put(path, handler);
router.delete(path, handler);
router.patch(path, handler);
router.all(path, handler);
router.use(middleware);
router.param(param, callback);
```

**Example:**

```ts
router.param("id", (req, res, next, id) => {
  console.log(id);
  next();
});
router.get("/user/:id", (req, res) => res.json({ id: req.params.id }));
app.use("/api", router);
```

---

### 3️⃣ Server Start

```ts
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

💡 **Note:**

- সব `res` method chainable: `res.status(200).json({msg:'ok'})`
- Middleware attach করতে `app.use()` বা `router.use()` ব্যবহার হয়
- `app.all()` / `router.all()` → সব HTTP method handle করে

---
