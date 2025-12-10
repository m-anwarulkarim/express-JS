/**
 * ===============================
 * res.location(path)
 * ===============================
 * ব্যাখ্যা:
 * res.location() ব্যবহার করে response এর "Location" header set করা হয়।
 * এটি সাধারণত redirect বা resource creation (201 Created) এর context এ ব্যবহৃত হয়।
 *
 * Parameters:
 * - path (string): যে path বা URL client কে নির্দেশ করা হবে
 *
 * গুরুত্বপূর্ণ:
 * - এটি শুধু header set করে, response পাঠায় না
 * - Redirect করতে চাইলে res.redirect() এর সাথে ব্যবহার করা যায়
 */

import express, { Request, Response } from 'express';
const app = express();

/**
 * উদাহরণ ১: Location header set করা
 */
app.post('/create-user', (req: Request, res: Response) => {
    // নতুন resource URL
    const userUrl = '/users/123';
    res.location(userUrl);       // Location header set
    res.status(201).send('User created'); // response send
});

/**
 * উদাহরণ ২: Absolute URL set
 */
app.get('/external', (req: Request, res: Response) => {
    res.location('https://example.com/profile');
    res.status(200).send('Location header set to external URL');
});

/**
 * ===============================
 * res.format(object)
 * ===============================
 * ব্যাখ্যা:
 * res.format() content negotiation এর জন্য ব্যবহার হয়। 
 * এটি client এর Accept header অনুযায়ী response select করে পাঠায়।
 *
 * Parameters:
 * - object: key-value pairs যেখানে key হলো MIME type (e.g., 'text/plain', 'application/json')
 *   এবং value হলো callback function যা সেই type এর response পাঠাবে
 *
 * গুরুত্বপূর্ণ:
 * - যদি client এর Accept header match না করে, 406 Not Ac*
