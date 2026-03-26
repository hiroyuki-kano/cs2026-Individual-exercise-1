import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();
        const description = data.get('description') as string;
        const deadline = data.get('deadline') as string;

        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                deadline,
            }),
        });

        // 失敗時はエラー
        if (!response.ok) {
            return fail(400, { message: '登録に失敗しました' });
        }

        // 成功時
        return { success: true };
    }
}