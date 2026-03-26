import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

router
  .route('/')
  // ログインユーザーに関連するTODOの複数件検索
  .get(async (req, res) => {
    // Sequelizeを使ってTODOを検索する
    const todos = await Todo.findAll({
      order: [['id', 'DESC']],
    });
    // レスポンスを返す
    res.json(todos);
  })
  // TODOの登録処理
  .post(async (req, res) => {
    // リクエストボディからTODO本文と期日を取得
    const { description, deadline } = req.body;

    // Sequelizeを使ってTODOを登録
    const todo = await Todo.create({
      description,
      deadline,
      done: false, // 済フラグの初期値は必ずfalse
    });

    // レスポンスを返す
    res.status(201);
    res.location(`${req.completeUrl}/${todo.id}`);
    res.json(todo);
  });

router
  .route('/:id')
  // id（主キー）でTODOを１件検索
  .get(async (req, res) => {
    // パスからIDを取得
    const id = Number(req.params.id);

    // Sequelizeを利用してTODOを1件検索
    const todo = await Todo.findByPk(id);

    // レスポンスを返す
    res.json(todo);
  })
  // id（主キー）でTODO１件の完了済みフラグを更新
  .patch(async (req, res) => {
    // パスからIDを取得
    const id = Number(req.params.id);

    // Sequelizeを利用してTODOを1件検索
    const todo = await Todo.findByPk(id);

    // TODOが存在しない場合はエラー
    if (todo == null) {
      const error = new Error(`ID ${id}の投稿が見つかりません。`);
      error.status = 404;
      throw error;
    }

    // リクエストボディから更新する各プロパティを取得
    const { description, deadline, done } = req.body;

    // Sequelizeを利用してTODO（の済フラグ）を更新
    await Todo.update(
      { description, deadline, done },
      {
        where: {
          id,
        },
      }
    );
    // 更新済みのTODOを取得
    const updatedTodo = await Todo.findByPk(id);
    // レスポンスを返す
    res.status(200);
    res.json(updatedTodo);
  })
  // id（主キー）でTODOを１件削除
  .delete(async (req, res) => {
    // パスからIDを取得
    const id = Number(req.params.id);

    // Sequelizeを利用してすでに存在するTODOを取得
    const todo = await Todo.findByPk(id);

    // TODOが存在しない場合はエラー
    if (todo == null) {
      const error = new Error(`ID ${id}の投稿が見つかりません。`);
      error.status = 404;
      throw error;
    }

    // Sequelizeを利用してTODOを削除
    await Todo.destroy({ where: { id } });

    // レスポンスを返す
    res.status(204);
    res.end();
  });

export default router;
