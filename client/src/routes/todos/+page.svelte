<script lang="ts">
    import type { PageProps } from "./$types";
    import {
        todos,
        updateTodos,
        completeTodo,
        deleteTodo,
    } from "$lib/stores/todoStore.svelte";

    // load関数からの戻り値を受け取る
    const { data }: PageProps = $props();

    // 受け取ったデータをストアにセットする
    updateTodos(data.todos);
</script>

<h1>TODO一覧</h1>

<a href="/todos/new">
    <button>新規TODO登録</button>
</a>

{#if todos.length === 0}
    <p>TODOはありません</p>
{:else}
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>説明</th>
                <th>作成日</th>
                <th>期限</th>
                <th>完了</th>
                <th>操作</th>
                <th>削除</th>
            </tr>
        </thead>
        <tbody>
            {#each todos as todo}
                <tr>
                    <td>{todo.id}</td>
                    <td>{todo.description}</td>
                    <td>{new Date(todo.createdAt).toLocaleString("ja-JP")}</td>
                    <td
                        >{new Date(todo.deadline).toLocaleDateString(
                            "ja-JP",
                        )}</td
                    >
                    <td>{todo.done ? "完了" : "未完了"}</td>
                    <td>
                        {#if todo.done}
                            -
                        {:else}
                            <button
                                onclick={async () => {
                                    // completeTodo(todo.id);
                                    // 以下のようにすれば、完了処理が失敗したときにエラーメッセージを表示できる
                                    try {
                                        await completeTodo(todo.id);
                                    } catch (e: any) {
                                        alert(e.message);
                                    }
                                }}>完了</button
                            >
                        {/if}
                    </td>
                    <td>
                        <button
                            onclick={async () => {
                                // deleteTodo(todo.id);
                                // 以下のようにすれば、削除処理が失敗したときにエラーメッセージを表示できる
                                try {
                                    await deleteTodo(todo.id);
                                } catch (e: any) {
                                    alert(e.message);
                                }
                            }}>削除</button
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
