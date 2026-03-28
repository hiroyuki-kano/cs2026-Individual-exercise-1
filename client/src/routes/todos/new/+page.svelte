<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { SubmitFunction } from "@sveltejs/kit";

    const customEnhance: SubmitFunction = () => {
        return async ({ result, update }) => {
            if (result.type === "success") {
                goto("/todos");
                return;
            } else if (result.type === "failure") {
                alert(result.data?.message ?? "登録に失敗しました");
            }
            update();
        };
    };
</script>

<div class="new-todo-page">
    <h1>新規TODO登録</h1>

    <div class="todo-form">
        <form method="POST" use:enhance={customEnhance}>
            <div>
                <label for="description">説明：</label>
                <input type="text" id="description" name="description" />
            </div>
            <div>
                <label for="deadline">期限：</label>
                <input type="date" id="deadline" name="deadline" />
            </div>
            <button class="btn-submit" type="submit">登録</button>
        </form>
    </div>

    <div class="to-list">
        <a href="/todos"><button class="btn-to-list">一覧に戻る</button></a>
    </div>
</div>

<style>
    /* 新規登録ページ全体の大枠（最大幅800pxで、中央に配置） */
    .new-todo-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    /* フォーム部分のカード領域 */
    .todo-form {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #aaa;
        border-radius: 8px;
    }

    /* 各入力項目（説明・期限）のまとまり */
    form div {
        margin: 1rem 0;
    }

    /* 入力項目名（ラベル）のスタイル */
    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
    }

    /* 実際の入力欄（テキストボックス・カレンダー）のスタイル */
    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--secondary-color);
        border-radius: 4px;
        color: #333;
        box-sizing: border-box; /* paddingとborderを含めたサイズで計算 */
    }

    /* 「登録」ボタンのデザイン */
    .btn-submit {
        width: 100%;
        padding: 0.5rem;
        background-color: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    /* 「一覧に戻る」リンクを配置する行のスタイル（flexboxを使って左右中央に配置） */
    .to-list {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }

    /* 「一覧に戻る」ボタン要素のデザイン */
    .btn-to-list {
        color: #777;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
