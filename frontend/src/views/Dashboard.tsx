import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForms";
import UserList from "../components/UserList";
import UserCharts from "../components/UserCharts";

const Dashboard: React.FC = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "USER",
    isActive: true,
  });
  const token = localStorage.getItem("authToken");

  const fetchUsers = async () => {
    try {
      
      const response = await fetch(`http://localhost:8080/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsersData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Request error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Request error", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <UserCharts usersData={usersData} loading={loading} />
      <UserForm
        newUser={newUser}
        setNewUser={setNewUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        setUsersData={setUsersData}
        token={token}
      />
      <UserList
        usersData={usersData}
        handleEdit={setEditingUser}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
