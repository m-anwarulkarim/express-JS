/**
 * ================================
 * Express.js Response (res) Object
 * ================================
 *
 * 1. res.app
 *    - বর্তমান Express অ্যাপ্লিকেশন instance কে refer করে।
 *    - উদাহরণ:
 *      console.log(res.app.get('env')); // বর্তমান environment দেখাবে
 *
 * 2. res.headersSent
 *    - Boolean, true হলে header পাঠানো হয়ে গেছে।
 *    - উদাহরণ:
 *      if (!res.headersSent) {
 *          res.send("Header not sent yet");
 *      }
 *
 * 3. res.locals
 *    - Current response এর জন্য local variables store করে।
 *    - Middleware থেকে view/template এ data পাঠাতে ব্যবহার হয়।
 *    - উদাহরণ:
 *      res.locals.user = req.user;
 *      res.render('dashboard'); // এখানে user access করা যাবে
 *
 * 4. res.append(name, value)
 *    - Response header এ নতুন value যোগ করে।
 *    - উদাহরণ:
 *      res.append('Set-Cookie', 'type=chocolate');
 *
 * 5. res.attachment([filename])
 *    - Response কে downloadable attachment হিসেবে mark করে।
 *    - উদাহরণ:
 *      res.attachment('report.pdf'); // browser download dialog দেখাবে
 *
 * 6. res.cookie(name, value, [options])
 *    - Client এর browser এ cookie set করে।
 *    - উদাহরণ:
 *      res.cookie('token', 'abc123', { httpOnly: true, maxAge: 3600000 });
 *
 * 7. res.clearCookie(name, [options])
 *    - Previously set cookie remove করে।
 *    - উদাহরণ:
 *      res.clearCookie('token');
 *
 * 8. res.download(path, [filename], [callback])
 *    - File download করানোর জন্য ব্যবহার হয়।
 *    - উদাহরণ:
 *      res.download('./files/report.pdf', 'myreport.pdf', (err) => {
 *          if (err) console.log(err);
 *      });
 *
 * 9. res.end([data])
 *    - Response শেষ করে। Optional data পাঠানো যায়।
 *    - উদাহরণ:
 *      res.end('Response Finished');
 *
 * 10. res.format(object)
 *     - Client এর Accept header অনুযায়ী response পাঠায়।
 *     - উদাহরণ:
 *       res.format({
 *         'text/plain': () => { res.send('plain text'); },
 *         'application/json': () => { res.json({msg: 'json'}); },
 *       });
 *
 * 11. res.get(field)
 *     - Response header এর value read করে।
 *     - উদাহরণ:
 *       const contentType = res.get('Content-Type');
 *
 * 12. res.json(obj)
 *     - JSON response পাঠায়। Content-Type auto set হয়।
 *     - উদাহরণ:
 *       res.json({ success: true, data: [] });
 *
 * 13. res.links(links)
 *     - Response header এ Link set করে। Pagination এ সাহায্য করে।
 *     - উদাহরণ:
 *       res.links({ next: '/page/2', last: '/page/10' });
 *
 * 14. res.location(path)
 *     - Response header Location set করে। Usually redirect এর আগে।
 *     - উদাহরণ:
 *       res.location('/home');
 *
 * 15. res.redirect([status], path)
 *     - Client কে অন্য URL এ redirect করে।
 *     - উদাহরণ:
 *       res.redirect(301, '/new-url'); // permanent redirect
 *
 * 16. res.render(view, [locals], callback)
 *     - Template render করে HTML response পাঠায়।
 *     - উদাহরণ:
 *       res.render('profile', { user: req.user });
 *
 * 17. res.send([body])
 *     - Flexible method, HTML, JSON, Buffer বা string পাঠাতে পারে।
 *     - উদাহরণ:
 *       res.send('<h1>Hello World</h1>');
 *
 * 18. res.sendFile(path, [options], callback)
 *     - File পাঠানোর জন্য। Mostly static files serve করার জন্য।
 *     - উদাহরণ:
 *       res.sendFile(path.join(__dirname, 'index.html'));
 *
 * 19. res.sendStatus(statusCode)
 *     - Status code set করে এবং corresponding message পাঠায়।
 *     - উদাহরণ:
 *       res.sendStatus(404); // Sends "Not Found"
 *
 * 20. res.type(type)
 *     - Content-Type set করে।
 *     - উদাহরণ:
 *       res.type('json'); // Content-Type: application/json
 *
 * 21. res.vary(field)
 *     - Response header Vary set করে। Caching control এর জন্য দরকার।
 *     - উদাহরণ:
 *       res.vary('Accept-Encoding');
 *
 * 💡 Note:
 * - সব মেথড chainable: res.status(200).json({msg: 'ok'});
 * - res.public official Express doc এ নেই, সম্ভবত custom middleware এর property।
 */
