/**
 * ===============================================
 * express.raw() – বিস্তারিত ব্যাখ্যা
 * ===============================================
 *
 * express.raw() হলো Express.js-এর একটি built-in middleware।
 * এটি incoming request body কে parse না করে, বরং
 * request body কে 그대로 একটা Buffer (binary/raw data) আকারে ধরতে সাহায্য করে।
 *
 * -----------------------------------------------
 * কখন express.raw() দরকার হয়?
 * -----------------------------------------------
 *
 * যখন client থেকে JSON বা form-urlencoded নয় — বরং
 * binary data বা raw data পাঠানো হয়, যেমন:
 *  - file upload as raw binary stream
 *  - webhook request (যেখানে signature validation এর জন্য raw body দরকার)
 *  - custom data format (যেমন image, audio, protobuf, কিংবা compressed data)
 *
 * এই ধরনের request body কে normal JSON বা text parser parse করতে পারবে না।
 * তখন express.raw() ব্যবহার করা হয়।
 *
 * -----------------------------------------------
 * express.raw() কী করে?
 * -----------------------------------------------
 *
 * - request body কে 그대로 Buffer হিসেবে সংগ্রহ করে রাখে।
 * - Buffer তৈরি হওয়ার পর সেই Buffer `req.body` তে পাওয়া যায়।
 * - যদি Content-Type header, parseable body বা matching type না হয় — তাহলে `req.body` undefined হবে। :contentReference[oaicite:2]{index=2}
 *
 * -----------------------------------------------
 * সাধারণ options (express.raw({ ... })) — যেমন:
 *  - type: কোন Content-Type হলে raw parse হবে (রূপে default হয় "application/octet-stream") :contentReference[oaicite:3]{index=3}
 *  - limit: body size limit (যেমন "100kb") :contentReference[oaicite:4]{index=4}
 *  - inflate: gzip/deflate compressed body হলে auto‑decompress করতে দেয় বা না দেয় :contentReference[oaicite:5]{index=5}
 *
 * -----------------------------------------------
 * ব্যবহারগত উদাহরণ (middleware হিসেবে)
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে raw body ধরবে, ধরো Content-Type: application/octet-stream
app.use(express.raw({ type: "application/octet-stream" }));

app.post("/upload-binary", (req: Request, res: Response) => {
  const dataBuffer = req.body; // Buffer type হলে raw binary data এখানে থাকবে
  if (dataBuffer instanceof Buffer) {
    // আপনি Buffer কে string / file / binary format হিসেবে ব্যবহার করতে পারেন
    const text = dataBuffer.toString("utf-8");
    res.send(`Received data: ${text}`);
  } else {
    res.status(400).send("No valid raw data received");
  }
});

app.listen(3000);
