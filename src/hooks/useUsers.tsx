import { useEffect, useRef, useState } from 'react';
import { type User } from '../types.d';
import { getUsers } from '../services/getUsers';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const origialUsers = useRef<User[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUsers(currentPage);
                setUsers(prevUsers => {
                    const newUsers = prevUsers.concat(data);
                    origialUsers.current = newUsers;
                    return newUsers;
                });
            } catch (error) {
                setError('Ocurrió un Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage]);

    const deleteUser = (uuid: string) => {
        const newUsers = users.filter(user => user.login.uuid !== uuid);
        setUsers(newUsers);
    };

    const resetUsers = () => setUsers(origialUsers.current);

    const nextPage = () => setCurrentPage(currentPage + 1);

    return { users, deleteUser, resetUsers, loading, error, nextPage };
}
