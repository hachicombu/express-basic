import express from "express";
import path from "path"; // アプリのディレクトリや絶対パスを取得
import { fileURLToPath } from "url";
const app = express();
const PORT = 8080;

// __fileName: ファイルまでの絶対パス
const __fileName = fileURLToPath(import.meta.url);
// __dirname: ファイルまでのディレクトリ
const __dirname = path.dirname(__fileName);

// 静的ディレクトリ作成
app.use(express.static(path.join(__dirname, "/public")));
// req.bodyにフォームで送信した値を格納
app.use(express.urlencoded({ extended: true }));

// getでルートページにリクエストがあった場合
app.get("/", (req, res) => {
  // index.htmlをレスポンスで返す（ブラウザに表示される）
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// postでリクエストがあった場合（送信ボタンクリック時）
app.post("/cart", (req, res) => {
  console.log(req.body); // { item: [ '1111', '2222' ] }
  const items = req.body.item;
  res.send(`${items.join("、")}がカートに入りました。`);
});

app.listen(PORT, () => {
  console.log(`start http:localhost:${PORT}`);
});
