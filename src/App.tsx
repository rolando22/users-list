import { useEffect, useState } from 'react';
import { UsersList } from './components';
import { User } from './types';
import './App.css';

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sortedByCountry, setSortedByCountry] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://randomuser.me/api?results=100');
                const data = await res.json();
                setUsers(data.results);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggleShowColors = () => setShowColors(!showColors);
    const toogleSortByCountry = () => setSortedByCountry(!sortedByCountry);

    const sortedUsers = sortedByCountry
        ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country))
        : users;

    return (
        <>
            <h1>Lista de Usuarios</h1>
            <header>
                <button onClick={toggleShowColors}>Colorear Filas</button>
                <button onClick={toogleSortByCountry}>{sortedByCountry ? 'No ordenar por país' : 'Ordenar por país'}</button>
            </header>
            <UsersList 
                showColors={showColors}
                users={sortedUsers} 
            />
        </>
    );
}
