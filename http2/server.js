import http2 from "http2";
import fs from "fs";
import express from "express";

const app = express();

// CORSを有効化
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 遅延処理を行うエンドポイント
app.get("/delay", async (req, res) => {
  console.log(`Request received at ${new Date().toISOString()}`);
  const delay = parseInt(req.query.ms) || 1000; // デフォルトで1秒遅延
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.json({ success: true, delayed: delay, timestamp: Date.now() });
});

// SSL証明書を読み込む（自己署名証明書を使用）
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

// HTTP/2サーバーの起動
const PORT = 3000;
http2.createSecureServer(options, app).listen(PORT, () => {
  console.log(`HTTP/2 server is running on https://localhost:${PORT}`);
});
