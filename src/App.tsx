import { useEffect, useMemo, useRef, useState } from 'react';
import { Header, UsersList } from './components';
import { SortBy, type User } from './types.d';
import './App.css';

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sorter, setSorter] = useState<SortBy>(SortBy.NONE);
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
    const handlerOnClickResetUsers = () => setUsers(origialUsers.current);
    const handlerOnChangeSetFilterCountry = (event: React.ChangeEvent<HTMLInputElement>) => 
        setFilterCountry(event.target.value);
    const handlerSorter = (sort: SortBy) => () => 
        sort === sorter ? setSorter(SortBy.NONE) : setSorter(sort);

    const filteredUsers = useMemo(() => {
        return filterCountry.length > 0
            ? users.filter(user => user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase()))
            : users;
    }, [users, filterCountry]);

    const sortedUsers = useMemo(() => {

        if (sorter === SortBy.NONE) return filteredUsers;

        const compareProperties: Record<string, (user: User) => string> = {
            [SortBy.COUNTRY]: user => user.location.country,
            [SortBy.NAME]: user => user.name.first,
            [SortBy.LAST]: user => user.name.last,
        };


        return [...filteredUsers].sort((a, b) => {
            const extractProperty = compareProperties[sorter];
            return extractProperty(a).localeCompare(extractProperty(b));
        });

    }, [filteredUsers, sorter]);

    const deleteUser = (uuid: string) => {
        const newUsers = users.filter(user => user.login.uuid !== uuid);
        setUsers(newUsers);
    };

    return (
        <>
            <h1>Lista de Usuarios</h1>
            <Header 
                showColors={showColors}
                filterCountry={filterCountry}
                sorter={sorter}
                toggleShowColors={toggleShowColors}
                sortBy={handlerSorter}
                resetUsers={handlerOnClickResetUsers}
                setFilterCountry={handlerOnChangeSetFilterCountry}
            />
            <main>
                <UsersList 
                    users={sortedUsers} 
                    showColors={showColors}
                    deleteUser={deleteUser}
                    sortBy={handlerSorter}
                    sorter={sorter}
                />
            </main>
        </>
    );
}
