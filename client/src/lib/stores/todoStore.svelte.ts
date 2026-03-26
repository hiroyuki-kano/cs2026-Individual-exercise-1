import type { Todo } from "$lib/types/TodoType";

export const todos = $state<Todo[]>([]);

export function updateTodos(newTodos: Todo[]) {
    todos.splice(0);
    todos.push(...newTodos);
}

export async function completeTodo(id: number) {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: true })
    });

    // 失敗時はエラーを投げる
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? '完了処理に失敗しました');
    }

    // 成功時は状態を更新（完了状態をtrueに）
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.done = true;
    }
}

export async function deleteTodo(id: number) {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });

    // 失敗時はエラーを投げる
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? '削除処理に失敗しました');
    }

    // 成功時は状態を更新（当該タスクを削除）
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
}