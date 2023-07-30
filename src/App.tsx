import React, { useEffect, useRef, useState } from 'react';
import { UsersList } from './components';
import { User } from './types';
import './App.css';

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sortedByCountry, setSortedByCountry] = useState(false);
    const [filterCountry, setFilterCountry] = useState('');
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
    const handlerOnChangeSetFilterCountry = (event: React.ChangeEvent<HTMLInputElement>) => 
        setFilterCountry(event.target.value);

    const filteredUsers = filterCountry.length > 0
        ? users.filter(user => user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase()))
        : users;

    const sortedUsers = sortedByCountry
        ? [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country))
        : filteredUsers;

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
                <input 
                    type='text' 
                    value={filterCountry}
                    placeholder='Filtra por país'
                    onChange={handlerOnChangeSetFilterCountry}
                />
            </header>
            <main>
                <UsersList 
                    users={sortedUsers} 
                    showColors={showColors}
                    deleteUser={deleteUser}
                />
            </main>
        </>
    );
}
