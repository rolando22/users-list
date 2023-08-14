import { APIResults } from "../types.d";

export async function getUsers({ pageParam = 1 }: { pageParam?: number }) {
    const res = await fetch(`https://randomuser.me/api?results=10&seed=rolando22&page=${pageParam}`);
    if (!res.ok) throw new Error('Ocurrió un Error');
    const data: APIResults = await res.json();
    const currentCursor = data.info.page;
    const nextCursor = currentCursor > 3 ? undefined : currentCursor + 1;
    return {
        users: data.results,
        nextCursor,
    };
}
