<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import TodoList from "$lib/components/TodoList.svelte";
  import { updateTodos } from "$lib/stores/todos.svelte";

  // Web APIから得たデータをload関数からpropsで受け取る
  const { data } = $props();

  // コンポーネントがマウントされた時の処理
  onMount(() => {
      // Web APIから得たデータで、Todoリストを更新する
      updateTodos(data.todos);
  });
</script>

<!-- Todoページのメインコンテナ -->
<div class="todos-page">
  <!-- ヘッダー部分 -->
  <div class="header">
    <h1 class="page-title">TODO一覧</h1>
    <!-- 新規Todo登録ボタン -->
    <button class="btn-new" onclick={() => goto("/todos/new")}>
      新規TODO登録
    </button>
  </div>
  <!-- Todoリストコンポーネント -->
  <TodoList />
</div>

<style>
  /* ページ全体のスタイル */
  .todos-page {
    width: 100%;
  }

  /* ヘッダーのスタイル */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  /* ページタイトルのスタイル */
  .page-title {
    color: #333;
    font-weight: 500;
    margin: 0;
  }

  /* ボタンの基本スタイル */
  button {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  /* 新規登録ボタンのスタイル */
  .btn-new {
    background-color: #333;
    color: #fff;
    border: 1px solid #000;
  }

  /* ボタンのホバー効果 */
  button:hover {
    opacity: 0.9;
  }
</style>
