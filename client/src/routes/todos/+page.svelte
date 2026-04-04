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

<div class="todos-page">
    <div class="header">
        <h1 class="page-title">TODO一覧</h1>
        <a href="/todos/new">
            <button class="btn-new">新規TODO登録</button>
        </a>
    </div>

    {#if todos.length === 0}
        <p>TODOはありません</p>
    {:else}
        <div class="todo-list">
            <table>
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
                            <td
                                >{new Date(todo.createdAt).toLocaleString(
                                    "ja-JP",
                                )}</td
                            >
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
                                        class="btn-done"
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
                                    class="btn-delete"
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
        </div>
    {/if}
</div>

<style>
    /* 一覧画面全体を包むコンテナ（横幅を100%にする） */
    .todos-page {
        width: 100%;
    }

    /* タイトルと新規登録ボタンを左右両端に並べるためのヘッダー領域 */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    /* 「TODO一覧」のタイトルの文字色や太さの指定 */
    .page-title {
        color: #333;
        font-weight: 500;
        margin: 0;
    }

    /* 黒背景の「新規TODO登録」ボタンのデザイン */
    .btn-new {
        background-color: #333;
        color: #fff;
        border: 1px solid #000;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    /* TODOを並べるテーブルの大枠スタイル */
    table {
        width: 100%;
        table-layout: fixed; /* 各列の幅を均等に */
        border-collapse: collapse; /* セルの境界線を一本に */
    }

    /* テーブル内の各マス目（見出し th とデータ td）の共通スタイル */
    th,
    td {
        padding: 0.5rem;
        border: 1px solid #aaa;
        text-align: left;
        word-break: break-all; /* 端まで来たら改行 */
    }

    /* テーブルの見出し部分の背景色と文字色 */
    th {
        background-color: var(--background-color);
        color: #000;
    }

    /* テーブルのデータ部分の文字色 */
    td {
        color: #333;
    }

    /* 各行に配置される「完了」ボタンのデザイン */
    .btn-done {
        background-color: var(--secondary-color);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
    }

    /* 各行に配置される「削除」ボタンのデザイン */
    .btn-delete {
        background-color: var(--error-color);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
