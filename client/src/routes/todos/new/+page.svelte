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

<h1>新規TODO登録</h1>

<form method="POST" use:enhance={customEnhance}>
    <div>
        <label for="description">説明：</label>
        <input type="text" id="description" name="description" />
    </div>
    <div>
        <label for="deadline">期限：</label>
        <input type="date" id="deadline" name="deadline" />
    </div>
    <button type="submit">登録</button>
</form>

<a href="/todos">一覧に戻る</a>
