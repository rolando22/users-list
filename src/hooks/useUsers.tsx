import { useEffect, useRef, useState } from 'react';
import { type User } from '../types.d';
import { getUsers } from '../services/getUsers';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const origialUsers = useRef<User[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUsers();
                setUsers(data);
                origialUsers.current = data;
            } catch (error) {
                setError('Ocurrió un Error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const deleteUser = (uuid: string) => {
        const newUsers = users.filter(user => user.login.uuid !== uuid);
        setUsers(newUsers);
    };

    const resetUsers = () => setUsers(origialUsers.current);

    return { users, deleteUser, resetUsers, loading, error };
}
