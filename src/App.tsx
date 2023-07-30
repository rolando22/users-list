import { useEffect, useRef, useState } from 'react';
import { UsersList } from './components';
import { User } from './types';
import './App.css';

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sortedByCountry, setSortedByCountry] = useState(false);
    const origialUsers = useRef<User[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://randomuser.me/api?results=100');
                const data = await res.json();
                setUsers(data.results);
                origialUsers.current = data.results;
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggleShowColors = () => setShowColors(!showColors);
    const toogleSortByCountry = () => setSortedByCountry(!sortedByCountry);
    const handlerOnClickResetUsers = () => setUsers(origialUsers.current);

    const sortedUsers = sortedByCountry
        ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country))
        : users;

    const deleteUser = (uuid: string) => {
        const newUsers = users.filter(user => user.login.uuid !== uuid);
        setUsers(newUsers);
    };

    return (
        <>
            <h1>Lista de Usuarios</h1>
            <header>
                <button onClick={toggleShowColors}>Colorear Filas</button>
                <button onClick={toogleSortByCountry}>{sortedByCountry ? 'No ordenar por país' : 'Ordenar por país'}</button>
                <button onClick={handlerOnClickResetUsers}>Resetear estado</button>
            </header>
            <UsersList 
                users={sortedUsers} 
                showColors={showColors}
                deleteUser={deleteUser}
            />
        </>
    );
}
