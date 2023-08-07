import { APIResults } from "../types.d";

export async function getUsers() {
    const res = await fetch('https://randomuser.me/api?results=100');
    const data: APIResults = await res.json();
    return data.results;
}
