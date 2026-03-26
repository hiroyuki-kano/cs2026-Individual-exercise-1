import { Sequelize } from 'sequelize';

// sequelizeオブジェクトの生成(DBへの接続)
const sequelize = new Sequelize('todo', 'casareal', 'P@ssw0rd', {
  dialect: 'mysql',
  define: {
    // データベース側の列名をスネークケース(アンダースコア区切り)にする
    underscored: true,
  },
  logQueryParameters: true,
});

export default sequelize;
