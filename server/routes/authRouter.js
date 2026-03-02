import { Router } from "express";
const router = Router();
const authrouter = router.post("/login", (req, res) => {
  // Here you would normally check the username and password against your database
  //   if (username === "admin@gmail.com" && password === "password") {
  res.json({ success: true, message: "Login successful!" });
  //   } else {
  //     res.status(401).json({ success: false, message: "Invalid credentials" });
  //   }
});
export default authrouter;
