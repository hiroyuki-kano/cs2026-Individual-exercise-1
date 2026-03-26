<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { addTodo } from '$lib/stores/todos.svelte';
  import type { Todo } from '$lib/models/Todo';

  const customEnhance: SubmitFunction = () => {
    return async ({ result }) => {
      if (result.type === 'success' && result.data) {
        addTodo(result.data as Todo);
        alert('TODOを登録しました');
        goto('/todos');
      } else {
        alert((result as any).data.message);
      }
    };
  };
</script>

<div class="todo-form">
  <form method="post" use:enhance={customEnhance}>
    <div>
      <label for="description">説明：</label>
      <input type="text" id="description" name="description" required />
    </div>
    <div>
      <label for="deadline">期限：</label>
      <input type="date" id="deadline" name="deadline" required />
    </div>
    <button type="submit">登録</button>
  </form>
</div>

<style>
  .todo-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #aaa;
    border-radius: 8px;
  }

  form > div {
    margin: 1rem 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--secondary-color);
    border-radius: 4px;
    color: #333;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.9;
  }
</style>
