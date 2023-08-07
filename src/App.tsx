import { useMemo, useState } from 'react';
import { Error, Header, Loader, UsersList } from './components';
import { useUsers } from './hooks/useUsers';
import { SortBy, type User } from './types.d';
import './App.css';

export function App() {
    const [showColors, setShowColors] = useState(false);
    const [sorter, setSorter] = useState<SortBy>(SortBy.NONE);
    const [filterCountry, setFilterCountry] = useState('');
    const { users, deleteUser, resetUsers, loading, error } = useUsers();

    const toggleShowColors = () => setShowColors(!showColors);
    const handlerOnClickResetUsers = () => resetUsers();
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
                {loading && !error && <Loader />}
                {!loading && error && <Error error={error} />}
                {!loading && !error && 
                    <UsersList 
                        users={sortedUsers} 
                        showColors={showColors}
                        deleteUser={deleteUser}
                        sortBy={handlerSorter}
                        sorter={sorter}
                    />
                }
            </main>
        </>
    );
}
