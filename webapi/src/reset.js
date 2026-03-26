// データ準備用スクリプト

import sequelize from './db/sequelize.js';
import Todo from './models/Todo.js';

const reset = async () => {
  try {
    // 既存のテーブルを一旦削除してModelクラスの通りに再作成
    await sequelize.sync({ force: true });
    await sequelize.transaction(async transaction => {
      await Todo.create(
        {
          description: 'TEST TODO 1000',
          deadline: new Date('2021-08-10T10:00:00+09:00'),
          done: false,
        },
        { transaction },
      );
      await Todo.create(
        {
          description: 'TEST TODO 2000',
          deadline: new Date('2021-11-16T10:00:00+09:00'),
          done: false,
        },
        { transaction },
      );
      await Todo.create(
        {
          description: 'TEST TODO 3000',
          deadline: new Date('2021-09-20T10:00:00+09:00'),
          done: false,
        },
        { transaction },
      );
      await Todo.create(
        {
          description: 'TEST TODO 4000',
          deadline: new Date('2021-12-31T10:00:00+09:00'),
          done: false,
        },
        { transaction },
      );
    });
  } finally {
    await sequelize.close();
  }
};

export default reset;