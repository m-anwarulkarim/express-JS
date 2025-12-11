/**
 * ============================================================================
 * 🚀 Advanced Error Handling System (Enterprise Ready)
 * Express.js + TypeScript + Winston Logger
 * ============================================================================
 *
 * এই সিস্টেম ৬টি বড় সমস্যা সমাধান করে:
 *  1. Error message এক জায়গায় control করা
 *  2. Status code normalize করা
 *  3. Async route error automatically ধরার ব্যবস্থা
 *  4. Log file + console logging (production-standard)
 *  5. Validation/DB error সুন্দরভাবে format করা
 *  6. Production vs Development mode এ আলাদা output
 *
 * ============================================================================
 * 1️⃣ Custom Error Class (AppError)
 * ----------------------------------------------------------------------------
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
 * 2️⃣ Winston Logger Setup (Logs → files + console)
 * ----------------------------------------------------------------------------
 */

import winston from "winston";

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // JSON format → বেস্ট প্র্যাকটিস
  ),
  transports: [
    new winston.transports.File({ filename: "logs/errors.log" }), // Error File
    new winston.transports.Console(), // Console output
  ],
});

/**
 * ============================================================================
 * 3️⃣ Async Route Wrapper — বারবার try/catch লেখার দরকার নেই
 * ----------------------------------------------------------------------------
 *
 * ব্যবহার:
 *   app.get("/users", catchAsync(async (req, res) => {...}));
 */
import { Request, Response, NextFunction } from "express";

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * ============================================================================
 * 4️⃣ Error Normalizer (DB / Validation Errors)
 * ----------------------------------------------------------------------------
 */

function normalizeError(err: any) {
  // PostgreSQL Unique Constraint Error (Generic)
  if (err.code === "23505") {
    return new AppError("Duplicate value not allowed", 400);
  }

  // Example: Validation Error (Zod/Yup/Joi detect করা)
  if (err.name === "ValidationError") {
    return new AppError(err.message, 400);
  }

  return err;
}

/**
 * ============================================================================
 * 5️⃣ Central Error Handler (Production-ready)
 * ----------------------------------------------------------------------------
 */

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err = normalizeError(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  const isDev = process.env.NODE_ENV === "development";

  // Log error (file + console)
  logger.error({
    message,
    status,
    stack: err.stack,
    time: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  });

  // Development: full details
  if (isDev) {
    return res.status(status).json({
      success: false,
      status,
      message,
      stack: err.stack,
      path: req.originalUrl,
    });
  }

  // Production: safe response
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

/**
 * ============================================================================
 * 6️⃣ Example Usages
 * ----------------------------------------------------------------------------
 *
 * Example 1: Direct Throw
 * -----------------------
 *     throw new AppError("User not found", 404);
 *
 * Example 2: Async Route
 * -----------------------
 *     app.get("/data", catchAsync(async (req, res) => {
 *        const d = await fetchSomething();
 *        res.json(d);
 *     }));
 *
 * Example 3: Validation Middleware
 * -----------------------
 *     const checkName = (req, res, next) => {
 *        if (!req.body.name) return next(new AppError("Name required", 422));
 *        next();
 *     };
 *
 * Example 4: DB Error
 * -----------------------
 *     next({ code: "23505" }); // PostgreSQL duplicate key error
 *
 * ============================================================================
 * 7️⃣ Must Add in App.ts
 * ----------------------------------------------------------------------------
 *  app.use(errorHandler); // Always last middleware
 *
 * ============================================================================
 */
