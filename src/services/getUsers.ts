import { APIResults } from "../types.d";

export async function getUsers(page: number) {
    const res = await fetch(`https://randomuser.me/api?results=10&seed=rolando22&page=${page}`);
    if (!res.ok) throw new Error('Ocurrió un Error');
    const data: APIResults = await res.json();
    return data.results;
}
