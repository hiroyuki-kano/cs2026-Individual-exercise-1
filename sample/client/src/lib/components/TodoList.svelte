<script lang="ts">
  // Todoリストの状態管理と操作関数をインポート
  import { todos, completeTodo, deleteTodo } from '$lib/stores/todos.svelte';
</script>

<!-- Todoリストのメインコンテナ -->
<div class="todo-list">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>説明</th>
        <th>作成日時</th>
        <th>期限</th>
        <th>完了</th>
        <th>操作</th>
        <th>削除</th>
      </tr>
    </thead>
    <tbody>
      <!-- 各Todoアイテムをループで表示 -->
      {#each todos as todo (todo.id)}
        <tr>
          <td>{todo.id}</td>
          <td>{todo.description}</td>
          <!-- 日付をローカル形式で表示 -->
          <td>{new Date(todo.createdAt).toLocaleString()}</td>
          <td>{new Date(todo.deadline).toLocaleDateString()}</td>
          <td>{todo.done ? '完了' : '未完了'}</td>
          <td>
            <!-- 未完了のTodoのみ完了ボタンを表示 -->
            {#if !todo.done}
              <button onclick={() => completeTodo(todo.id)} class="btn-done">完了</button>
            {:else}
              -
            {/if}
          </td>
          <td>
            <button onclick={() => deleteTodo(todo.id)} class="btn-delete">削除</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* テーブルの基本スタイル */
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #aaa;
    text-align: left;
    word-break: break-all;
  }

  /* ヘッダーのスタイル */
  th {
    background-color: var(--background-color);
    color: #000;
  }

  td {
    color: #333;
  }

  /* 完了ボタンのスタイル */
  .btn-done {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  /* 削除ボタンのスタイル */
  .btn-delete {
    background-color: var(--error-color);
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  /* ボタンのホバー効果 */
  .btn-done:hover,
  .btn-delete:hover {
    opacity: 0.9;
  }
</style>
