/**
 * ============================================================
 * ⭐ next() এর বিস্তৃত ব্যাখ্যা ও উদাহরণ (Express.js)
 * ============================================================
 *
 * Middleware chain এ next() হলো **signal**—“পরবর্তী middleware চালাও”
 * কিন্তু এর ব্যবহার বিভিন্ন ক্ষেত্রে আলাদা।
 *
 * ============================================================
 * 1️⃣ সাধারণ ব্যবহার (Next without error)
 * ------------------------------------------------------------
 * next() কল করলে পরবর্তী middleware বা route handler এ চলে যায়।
 *
 * Example:
 *
 * const logger = (req: Request, res: Response, next: NextFunction) => {
 *   console.log(`Request URL: ${req.url}`);
 *   next(); // পরবর্তী middleware এ যাবে
 * };
 *
 *
 * ============================================================
 * 2️⃣ Error pass করা
 * ------------------------------------------------------------
 * next() এর ভিতরে error দিলে Express ধরে নেয় এটি error
 * এবং সরাসরি Error-handling middleware এ চলে যায়।
 *
 * Example:
 *
 * const authGuard = (req: Request, res: Response, next: NextFunction) => {
 *   const token = req.headers["x-auth-token"];
 *   if (!token) {
 *     next(new Error("Unauthorized!")); // Error middleware এ যাবে
 *   } else {
 *     next(); // ঠিক আছে → পরবর্তী middleware
 *   }
 * };
 *
 *
 * ============================================================
 * 3️⃣ Async middleware এ next()
 * ------------------------------------------------------------
 * Async operation এ try/catch দিয়ে error handle করতে হবে।
 *
 * Example:
 *
 * const asyncMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 *   try {
 *     const data = await fetchSomeData(); // فرض করে async function
 *     req.body.data = data;
 *     next(); // Success → পরবর্তী middleware
 *   } catch (err) {
 *     next(err); // Async error → Error middleware
 *   }
 * };
 *
 *
 * ============================================================
 * 4️⃣ next() এর ভিতরে কোনো arbitrary value দিলে
 * ------------------------------------------------------------
 * Express সবকিছুকে error হিসেবে ধরে।
 * উদাহরণ:
 *
 * next("Some text");       // String → Error middleware
 * next({ message: "Fail" }); // Object → Error middleware
 * next(true);              // Boolean → Error middleware
 *
 *
 * ============================================================
 * 5️⃣ ভুল যা এড়িয়ে চলা উচিত
 * ------------------------------------------------------------
 * ❌ next() + res.send() একসাথে ব্যবহার করা
 * ❌ next(error) দিয়ে error দিলে route handler আশা করা
 * ❌ empty next() না দিয়ে arbitrary value দেওয়া (except error)
 *
 *
 * ============================================================
 * 🔹 সম্পূর্ণ উদাহরণ: Middleware chain
 * ------------------------------------------------------------
 *
 * const checkAge = (req: Request, res: Response, next: NextFunction) => {
 *   const age = parseInt(req.query.age as string);
 *
 *   if (age >= 18) {
 *     console.log("Age OK → next()");
 *     next(); // ঠিক আছে → পরবর্তী middleware
 *   } else {
 *     console.log("Age NOT OK → next(error)");
 *     next("Age restriction: Under 18 not allowed");
 *   }
 * };
 *
 * app.use(checkAge);
 *
 * app.get("/", (req: Request, res: Response) => {
 *   res.send("Welcome to the site!");
 * });
 *
 * // Error-handling middleware
 * app.use((err: any, req: Request, res: Response, next: NextFunction) => {
 *   console.error("Error caught:", err);
 *   res.status(400).send("Error: " + err);
 * });
 *
 * ============================================================
 * 🔹 Key Takeaways:
 * ------------------------------------------------------------
 * 1. next() → পরবর্তী middleware বা route handler এ যায়
 * 2. next(error) → সরাসরি Error-handling middleware এ যায়
 * 3. Async middleware → try/catch দিয়ে error handle করা আবশ্যক
 * 4. next() + res.send() একই middleware এ ব্যবহার করা যাবে না
 * 5. Arbitrary value next() এ দিলে Express error ধরে
 *
 */
