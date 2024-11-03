import React from "react";

interface UserListProps {
  usersData: any[];
  handleEdit: (user: any) => void;
  handleDelete: (id: number) => Promise<void>;
}

const UserList: React.FC<UserListProps> = ({ usersData, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      <ul className="list-disc pl-5">
        {usersData.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name} {user.lastname} ({user.email}) - {user.role} -{" "}
            {user.isActive ? "Ativo" : "Cancelado"}
            <button
              onClick={() => handleEdit(user)}
              className="ml-4 text-blue-500"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-2 text-red-500"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
