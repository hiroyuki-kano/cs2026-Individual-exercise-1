<script lang="ts">
  //新規Todo登録ページのコンポーネント
  import TodoForm from '$lib/components/TodoForm.svelte';
  import { goto } from '$app/navigation';

</script>

<div class="new-todo-page">
  <h1>新規TODO登録</h1>
  <TodoForm />
  <div class="actions">
    <button onclick={() => goto('/todos')}>一覧に戻る</button>
  </div>
</div>

<style>
  .new-todo-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .actions {
    margin-top: 2rem;
    text-align: center;
  }

  button {
    color: #777;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.9;
  }
</style> 