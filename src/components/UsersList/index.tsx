import { type User } from "../../types.d";
import './UsersList.css';

interface Props {
    users: User[]
    showColors: boolean
    deleteUser: (uuid: string) => void
}

export function UsersList({ users, showColors, deleteUser }: Props) {
    const classShowColor = showColors ? 'table--showColors' : '';

    const handlerDeleteUser = (uuid: string) => () => deleteUser(uuid);

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
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
