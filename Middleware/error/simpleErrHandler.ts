/**
 * ============================================================================
 * 🚀 Error Handling System — Production-Ready (Express + TypeScript)
 * ============================================================================
 *
 * এই ফাইলটিতে ৩টি জিনিস সম্পূর্ণভাবে সাজানো আছে:
 *
 * 1️⃣ AppError → Custom Error Class
 * 2️⃣ catchAsync → Async Route Wrapper
 * 3️⃣ errorHandler → Centralized Error Middleware
 *
 * এগুলো industry-level Express apps এ সবচেয়ে বেশি ব্যবহৃত Pattern।
 *
 * ============================================================================
 * 1️⃣ CUSTOM ERROR CLASS (AppError)
 * ----------------------------------------------------------------------------
 * ব্যবহার:
 *    throw new AppError("User not found", 404);
 *
 * কেন দরকার?
 *    - Default Error শুধু message রাখে, status code রাখে না।
 *    - Custom error দিলে status, message, isOperational flag রাখা যায়।
 * ============================================================================
 */

export class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string, status: number = 500) {
    super(message);

    this.status = status;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * ============================================================================
 * 2️⃣ ASYNC ROUTE WRAPPER (catchAsync)
 * ----------------------------------------------------------------------------
 * Express async routes এ try/catch না দিলে unhandled error হয়।
 *
 * ব্যবহার:
 *     app.get("/users", catchAsync(async (req, res) => {}));
 *
 * সুবিধা:
 *     - বারবার try/catch লেখার দরকার নেই
 *     - Error automatically next(err) এ যাবে
 * ============================================================================
 */

import { Request, Response, NextFunction } from "express";

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * ============================================================================
 * 3️⃣ CENTRALIZED ERROR HANDLER (errorHandler)
 * ----------------------------------------------------------------------------
 * MUST HAVE 4 parameters → (err, req, res, next)
 *
 * Features:
 *   ✔ Status code based response
 *   ✔ Message normalization
 *   ✔ Operational vs Programming errors
 *   ✔ Production-safe output
 * ============================================================================
 */

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default fallback
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Console error (timestamp সহ)
  console.error(`[${new Date().toISOString()}] ❌ ERROR:`, {
    message: err.message,
    stack: err.stack,
    status: status,
  });

  res.status(status).json({
    success: false,
    status,
    message,
  });
};

/**
 * ============================================================================
 * 4️⃣ SHORT EXAMPLES
 * ----------------------------------------------------------------------------
 * Example 1: সাধারণ Route error
 *
 * app.get("/test", (req, res, next) => {
 *     next(new AppError("Route failed!", 400));
 * });
 *
 * ----------------------------------------------------------------------------
 *
 * Example 2: Async Route (catchAsync)
 *
 * app.get("/users", catchAsync(async (req, res) => {
 *     const data = await fetchUsers(); // suppose async
 *     res.json(data);
 * }));
 *
 * ----------------------------------------------------------------------------
 *
 * Example 3: Middleware validation error
 *
 * const checkBody = (req, res, next) => {
 *     if (!req.body.name) {
 *         return next(new AppError("Name is required", 422));
 *     }
 *     next();
 * };
 *
 * app.post("/create", checkBody, (req, res) => {
 *     res.send("Created!");
 * });
 *
 * ============================================================================
 * FINAL NOTES
 * ----------------------------------------------------------------------------
 *  ✔ AppError ব্যবহার করলে clean response পাওয়া যায়।
 *  ✔ catchAsync async route error handle করে।
 *  ✔ errorHandler সব error centralize করে।
 *
 *  → এটাই modern Express apps এ সবচেয়ে clean architecture।
 *
 * ============================================================================
 */
