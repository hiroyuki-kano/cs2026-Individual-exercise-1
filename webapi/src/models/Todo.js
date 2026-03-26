import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

// TODOモデルオブジェクトの宣言
// ※ idとcreatedAtはsequelizeにより自動的に用意される
const Todo = sequelize.define('Todo', {
  description: DataTypes.STRING,
  deadline: DataTypes.DATE,
  done: DataTypes.BOOLEAN
});

export default Todo;
