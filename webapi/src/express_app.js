// 利用するパッケージのインポート
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import completeUrl from './middlewares/completeUrl.js';
import todosRouter from './routes/todosRouter.js';

// Expressアプリケーションの準備
const app = express();

// 利用するミドルウェアの登録
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(completeUrl);

// RouterオブジェクトとURLの紐付け
app.use('/api/todos', todosRouter);

app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Not Found' });
});

// エラーハンドラー
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status ?? 500;
  res.status(status);
  res.json({ message: err.message });
});

export default app;
