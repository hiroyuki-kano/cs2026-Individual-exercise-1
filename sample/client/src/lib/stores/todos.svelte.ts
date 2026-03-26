// Todoリストの状態を管理するストア
import type { Todo } from '$lib/models/Todo';

// Todoリスト
export const todos = $state<Todo[]>([]);

// Todoリストを更新する関数
export function updateTodos(newTodos: Todo[]) {
  // 配列の中身を一旦、空にする
  todos.splice(0);
  // サーバーから取得したデータを配列にセットする
  todos.push(...newTodos);
}

// 新しいTodoを追加する関数
export function addTodo(newTodo: Todo) {
  todos.push(newTodo);
}

// Todoを完了状態に更新する関数
export async function completeTodo(id: number) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = true;
    // Web APIを呼び出して完了状態を更新
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  }
}

// Todoを削除する関数
export async function deleteTodo(id: number) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    // Web APIを呼び出してTodoを削除
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    // ローカルのTodoリストからも削除
    todos.splice(
      todos.findIndex((todo) => todo.id === id),
      1
    );
  }
}
