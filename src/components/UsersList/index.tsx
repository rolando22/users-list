import { type User } from "../../types.d";
import './UsersList.css';

interface Props {
    showColors: boolean
    users: User[]
}

export function UsersList({ showColors, users }: Props) {
    const classShowColor = showColors ? 'table--showColors' : '';

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
                            <button>Borrar</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
