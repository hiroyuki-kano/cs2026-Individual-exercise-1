import type { PageServerLoad } from "./$types";
import type { Todo } from "$lib/types/TodoType";

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('/api/todos');
    const todos: Todo[] = await response.json();
    return { todos };
};