import {useEffect, useState} from 'react';

import {useAuth} from '../hooks/useAuth';
import {getUsers, deleteUser} from '../services/api';
import type {User} from '../types/user';
import UserForm from '../components/forms/UserForm';
import {Button} from '../components/button/Button';

const AdminUsers = () => {
  const {token} = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    if (!token) return;

    const loadUsers = async () => {
      const result = await getUsers(token);
      if ('message' in result) {
        setMessage(result.message);
        return;
      }
      setUsers(result);
    };
    loadUsers();
  }, [token, recargar]);

  const handleDelete = async (id: string) => {
    if (!token) return;

    const result = await deleteUser(token, id);
    setMessage(result.message);
    setUsers((current) => current.filter((user) => user._id !== id));
  };

  return (
    <div className="admin__layout">
      <div className="admin__panel admin__form surface">
        <UserForm mode="create" onSuccess={() => setRecargar(recargar + 1)} />
      </div>

      <div className="admin__panel surface">
        <div className="admin__head">
          <h2>
            Usuarios <span className="admin__count">({users.length})</span>
          </h2>
        </div>

        {message && <p className="admin__message">{message}</p>}

        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.username} {user.userSurname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
