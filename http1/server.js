import express from "express";
import cors from "cors";

const app = express();

// CORSを有効化
app.use(cors());

// 遅延処理を実行するエンドポイント
app.get("/delay", async (req, res) => {
  const delay = parseInt(req.query.ms) || 1000; // デフォルトで1秒遅延
  await new Promise((resolve) => setTimeout(resolve, delay)); // 遅延をシミュレート
  res.json({ success: true, delayed: delay, timestamp: Date.now() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
