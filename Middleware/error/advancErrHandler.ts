/**
 * ============================================================================
 *  🚀 ENTERPRISE ERROR HANDLING SYSTEM
 *  Express + TypeScript + PostgreSQL + Zod + Sentry + Winston Logs
 * ============================================================================
 * এগুলো কিভাবে ব্যবহার করতে হবে তার উদাহরণসহ নিচে দেওয়া আছে।
 *
 *  Features Included:
 *  -------------------
 *  ✔ Custom AppError (status + message + isOperational)
 *  ✔ Async wrapper (catchAsync)
 *  ✔ PostgreSQL error mapper (duplicate key, invalid input)
 *  ✔ Zod validation error formatter
 *  ✔ Sentry cloud monitoring support
 *  ✔ Winston + Daily Rotate Logs (production standard)
 *  ✔ Correlation ID per request → Track each request uniquely
 *  ✔ Dev vs Prod safe response
 *  ✔ Centralized error JSON structure
 *
 *  **This is enterprise-level standard.**
 *
 * ============================================================================
 * 1️⃣ INSTALL DEPENDENCIES
 * ----------------------------------------------------------------------------
 *  npm install winston winston-daily-rotate-file
 *  npm install @sentry/node @sentry/tracing
 *  npm install uuid
 *
 * ============================================================================
 * 2️⃣ IMPORTS
 * ----------------------------------------------------------------------------
 */

import { Request, Response, NextFunction } from "express";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as Sentry from "@sentry/node";
import { v4 as uuid } from "uuid";
import { ZodError } from "zod";

/**
 * ============================================================================
 * 3️⃣ SENTRY SETUP (Cloud Monitoring)
 * ----------------------------------------------------------------------------
 *  Note: Add your DSN in .env → SENTRY_DSN=xxxx
 */

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

/**
 * ============================================================================
 * 4️⃣ CUSTOM ERROR CLASS (AppError)
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
 * 5️⃣ WINSTON LOGGER + DAILY ROTATION
 * ----------------------------------------------------------------------------
 */

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
    new winston.transports.Console(),
  ],
});

/**
 * ============================================================================
 * 6️⃣ CORRELATION ID MIDDLEWARE
 * ----------------------------------------------------------------------------
 *  → Every Request gets a unique ID for tracking
 */

export const correlationId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = uuid();
  (req as any).correlationId = id;
  res.setHeader("X-Request-ID", id);
  next();
};

/**
 * ============================================================================
 * 7️⃣ ASYNC WRAPPER (catchAsync)
 * ----------------------------------------------------------------------------
 */

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * ============================================================================
 * 8️⃣ POSTGRESQL ERROR NORMALIZER
 * ----------------------------------------------------------------------------
 */

function mapPostgresError(err: any): AppError | null {
  if (!err.code) return null;

  const pgErrors: Record<string, any> = {
    "23505": new AppError("Duplicate value is not allowed", 400),
    "22P02": new AppError("Invalid data format for field", 400),
    "23503": new AppError("Foreign key constraint failed", 400),
  };

  return pgErrors[err.code] || null;
}

/**
 * ============================================================================
 * 9️⃣ ZOD VALIDATION ERROR FORMATTER
 * ----------------------------------------------------------------------------
 */

function formatZodError(error: ZodError) {
  const issues = error.issues.map((i) => ({
    field: i.path.join("."),
    message: i.message,
  }));

  return new AppError(JSON.stringify(issues), 422);
}

/**
 * ============================================================================
 * 🔟 CENTRAL ERROR HANDLER (MAIN PART)
 * ----------------------------------------------------------------------------
 */

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = (req as any).correlationId;

  // PostgreSQL error mapping
  const pgErr = mapPostgresError(err);
  if (pgErr) err = pgErr;

  // Zod validation error mapping
  if (err instanceof ZodError) {
    err = formatZodError(err);
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Log the error
  logger.error({
    correlationId,
    status,
    message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Send error to Sentry (Cloud)
  Sentry.captureException(err);

  const isDev = process.env.NODE_ENV === "development";

  // Developer mode → show full info
  if (isDev) {
    return res.status(status).json({
      success: false,
      status,
      message,
      stack: err.stack,
      correlationId,
    });
  }

  // Production mode → safe output
  return res.status(status).json({
    success: false,
    status,
    message,
    correlationId,
  });
};

/**
 * ============================================================================
 * 1️⃣1️⃣ USAGE EXAMPLES
 * ----------------------------------------------------------------------------
 *
 *  app.use(correlationId); // Before routes
 *
 *  app.get("/user",
 *    catchAsync(async (req, res) => {
 *      const user = await db.query("SELECT * FROM users");
 *      res.json(user);
 *    })
 *  );
 *
 *  throw new AppError("User not found", 404);
 *
 *  app.use(errorHandler); // Always last
 *
 * ============================================================================
 */
