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
 * - যদি Content-Type header, parseable body বা matching type না হয়
 *   — তাহলে `req.body` undefined হবে।
 *
 * -----------------------------------------------
 * সাধারণ options (express.raw({ ... }))
 * -----------------------------------------------
 *
 *  - type: কোন Content-Type হলে raw parse হবে
 *    (default হয় "application/octet-stream")
 *
 *  - limit: body size limit (যেমন "100kb")
 *
 *  - inflate: gzip/deflate compressed body হলে auto-decompress করবে কিনা
 *
 * -----------------------------------------------
 * এই ক্ষেত্রে সাধারণত সবাই যে ভুলগুলো করে
 * -----------------------------------------------
 *
 * 1) express.json() বা express.urlencoded() আগে বসিয়ে ফেলা
 *
 *    ❌ ভুল:
 *      app.use(express.json());
 *      app.use(express.raw());
 *
 *    উপরের ক্ষেত্রে JSON middleware আগেই body consume করে ফেলবে,
 *    ফলে raw middleware আর কাজ করবে না।
 *
 *    ✅ সঠিক:
 *      app.use(express.raw({ type: "application/octet-stream" }));
 *
 * 2) Client থেকে ভুল Content-Type পাঠানো
 *
 *    Raw data পাঠানোর সময় অনেকেই:
 *      Content-Type: application/json
 *    দিয়ে দেয়, ফলে raw parser match করে না।
 *
 * 3) Buffer না বুঝে string ধরে নেওয়া
 *
 *    অনেকেই সরাসরি `req.body` কে string ধরে কাজ করে:
 *
 *    ❌ ভুল:
 *      const data = req.body;
 *      console.log(data.length); // Error হতে পারে
 *
 *    ✅ সঠিক:
 *      যদি (req.body instanceof Buffer) {
 *        const text = req.body.toString("utf-8");
 *      }
 *
 * 4) বড় binary পাঠিয়ে limit ভুলে যাওয়া
 *
 *    বড় file পাঠালে default limit এ গিয়ে error হতে পারে।
 *    তখন limit set করতে হয়:
 *
 *    app.use(express.raw({ type: "application/octet-stream", limit: "5mb" }));
 *
 * -----------------------------------------------
 * ব্যবহারগত উদাহরণ (middleware হিসেবে)
 * -----------------------------------------------
 */

import express from "express";
import { Request, Response } from "express";

const app = express();

// Middleware হিসেবে raw body ধরবে
app.use(
  express.raw({
    type: "application/octet-stream",
    limit: "5mb",
  })
);

app.post("/upload-binary", (req: Request, res: Response) => {
  const dataBuffer = req.body;

  if (dataBuffer instanceof Buffer) {
    const text = dataBuffer.toString("utf-8");
    res.send(`Received data: ${text}`);
  } else {
    res.status(400).send("No valid raw data received");
  }
});

app.listen(3000);
