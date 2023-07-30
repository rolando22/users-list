import { useEffect, useState } from 'react';
import { UsersList } from './components';
import { User } from './types';
import './App.css';

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);

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

    return (
        <>
            <h1>Lista de Usuarios</h1>
            <header>
                <button onClick={toggleShowColors}>Colorear Filas</button>
            </header>
            <UsersList 
                showColors={showColors}
                users={users} 
            />
        </>
    );
}
