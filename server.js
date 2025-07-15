const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("database.db");
app.use(express.json());
app.use(cors());

// Tạo bảng nếu chưa có
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// Đăng ký
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hash],
    (err) => {
      if (err) return res.status(400).json({ error: "Tên đã tồn tại" });
      res.json({ message: "Đăng ký thành công" });
    }
  );
});

// Đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (!user) return res.status(400).json({ error: "Sai tài khoản" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Sai mật khẩu" });
    res.json({ message: "Đăng nhập thành công" });
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
