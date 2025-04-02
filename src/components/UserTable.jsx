import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, deleteUser, updateUser } from "../redux/slices/userSlice";

import { logout } from "../redux/slices/authSlice";


const UserTable = () => {
  const dispatch = useDispatch();
  const { userdata: users, loading, error } = useSelector((state) => state.user);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
const {  token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUser(page));
  }, [dispatch, page]);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(fetchUser(page));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editingUser.id, editUser: editingUser }));
    setEditingUser(null);
    dispatch(fetchUser(page));
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={handleLogOut}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Log Out
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-center">User List </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Avatar</th>
              <th className="py-3 px-6 text-center">First Name</th>
              <th className="py-3 px-6 text-center">Last Name</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-6">{user.id}</td>
                <td className="py-2 px-6">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="py-2 px-6">{user.first_name}</td>
                <td className="py-2 px-6">{user.last_name}</td>
                <td className="py-2 px-6">{user.email}</td>
                <td className="py-2 px-6">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 mx-2"
        >
          Previous
        </button>
        <span className="text-lg"> Page {page} </span>
        <button
          disabled={page >= 2}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 mx-2"
        >
          Next
        </button>
      </div>
      <h2 className="text-2xl font-semibold m-4 text-center">Token : <span className=" bg-gray-300 p-2 rounded-lg">{token}</span></h2>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center   mx-auto">
          <div className="p-6 bg-white shadow-md rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={editingUser.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={editingUser.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
