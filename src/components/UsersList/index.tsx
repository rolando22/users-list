import { SortBy, type User } from "../../types.d";
import './UsersList.css';

interface Props {
    users: User[]
    showColors: boolean
    deleteUser: (uuid: string) => void
    sortBy: (sort: SortBy) => () => void
}

export function UsersList({ users, showColors, deleteUser, sortBy }: Props) {
    const classShowColor = showColors ? 'table--showColors' : '';

    const handlerDeleteUser = (uuid: string) => () => deleteUser(uuid);
    const handleSortBy = (sort: SortBy) => sortBy(sort);

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={handleSortBy(SortBy.NAME)}>Nombre</th>
                    <th onClick={handleSortBy(SortBy.LAST)}>Apellido</th>
                    <th onClick={handleSortBy(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={classShowColor}>
                {users.map(user => 
                    <tr key={user.login.uuid}>
                        <td>
                            <img 
                                src={user.picture.thumbnail} 
                                alt={user.login.username} 
                            />
                        </td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button onClick={handlerDeleteUser(user.login.uuid)}>Eliminar</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
