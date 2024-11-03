import React, { useEffect, useState } from "react";

interface UserFormProps {
  newUser: any;
  setNewUser: React.Dispatch<React.SetStateAction<any>>;
  editingUser: any | null;
  setEditingUser: React.Dispatch<React.SetStateAction<any | null>>;
  setUsersData: React.Dispatch<React.SetStateAction<any[]>>;
  token: string | null;
}

const UserForm: React.FC<UserFormProps> = ({
  newUser,
  setNewUser,
  editingUser,
  setEditingUser,
  setUsersData,
  token,
}) => {
  const [error, setError] = useState<string | null>(null); // Estado para mensagem de erro

  useEffect(() => {
    if (editingUser) {
      setNewUser({
        name: editingUser.name,
        lastname: editingUser.lastname,
        email: editingUser.email,
        password: "",
        role: editingUser.role,
        isActive: true,
      });
    } else {
      setNewUser({
        name: "",
        lastname: "",
        email: "",
        password: "",
        role: "USER",
        isActive: true,
      });
    }
  }, [editingUser, setNewUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newUser.name ||
      !newUser.lastname ||
      !newUser.email ||
      !newUser.password
    ) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }

    setError(null);

    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `http://localhost:8080/users/${editingUser.id}`
      : `http://localhost:8080/users`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUsersData((prev) =>
          editingUser
            ? prev.map((user) =>
                user.id === updatedData.id ? updatedData : user
              )
            : [...prev, updatedData]
        );
        setEditingUser(null);
        setNewUser({
          name: "",
          lastname: "",
          email: "",
          password: "",
          role: "USER",
          isActive: true,
        });
      } else {
        console.error("Failed to save user");
      }
    } catch (error) {
      console.error("Request error", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {editingUser ? "Editar Usuário" : "Criar Novo Usuário"}
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={newUser.lastname}
          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mb-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 mb-2"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingUser ? "Atualizar" : "Criar"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UserForm;
