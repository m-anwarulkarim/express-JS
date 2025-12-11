/**
 * res.location(path)
 * ---------------------------------------
 * কাজ:
 * HTTP response এর "Location" header সেট করে।
 * সাধারণত redirect বা resource এর নতুন অবস্থান (URL) জানাতে ব্যবহার হয়।
 *
 * এটা আসলে body পাঠায় না, শুধু header সেট করে।
 * বেশিরভাগ সময় res.redirect() এর সাথে internally ব্যবহার হয়।
 *
 * Syntax:
 * res.location(path: string): Response
 *
 * Parameter:
 * - path (string): যে URL বা path টি "Location" header এ সেট হবে。
 *
 * Return:
 * - Response object return করে, তাই method chaining সম্ভব।
 *
 * Basic Example:
 */
app.get("/basic-location", (req, res) => {
  res.location("/new-path");
  res.send("Location header has been set");
});
