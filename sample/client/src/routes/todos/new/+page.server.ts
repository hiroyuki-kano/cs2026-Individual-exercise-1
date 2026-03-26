import { fail, type Actions } from "@sveltejs/kit";

//新規Todoの作成を処理するアクション
export const actions: Actions = {
    default: async ({ request, fetch }) => {
        //フォームのデータを取得する
        const formData = await request.formData();
        const description = formData.get('description');
        const deadline = formData.get('deadline');
        //Web APIを呼び出して新規Todoを作成する
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, deadline }),
        });
        const data = await response.json();
        if (response.status === 201) {
            //Web APIからの返答が201(Created)の場合は新規Todo作成成功
            return data;
        } else {
            //エラーがある場合は、fail関数を使ってエラーを返す
            return fail(response.status, data);
        }
    }
}
