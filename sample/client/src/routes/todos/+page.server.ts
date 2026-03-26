import type { PageServerLoad } from './$types';
//load関数はページが読み込まれる前に実行される。
//表示するデータをWeb APIから取得する。
export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    return { todos };
}
