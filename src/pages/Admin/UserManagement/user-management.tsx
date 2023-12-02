import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../../../entities/userList.entity";
import { getData, updateData } from "../../Services/API";

function UserManagement() {
  const [users, setUsers] = useState<UserList[]>([]); // State để lưu trữ dữ liệu
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalUsers, setOriginalUsers] = useState<UserList[]>([]); // Sao lưu danh sách người dùng gốc

  function getDataUser() {
    getData("users").then((response) => {
      setUsers(response);
      setOriginalUsers(response); // Sao lưu danh sách người dùng gốc
    });
  }

  useEffect(() => {
    // Sử dụng Axios để lấy dữ liệu từ tệp JSON
    getDataUser();
  }, []);

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = () => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filteredUsers = originalUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers([...filteredUsers]);
  };

  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setUsers(originalUsers); // Đặt lại danh sách người dùng bằng danh sách gốc
  };

  const handleRoleChange = (userID: string, newRole: string) => {
    // Tìm người dùng có userID tương ứng và cập nhật vai trò của họ
    const updatedUsers = users.map((user) =>
      user.id === userID ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);

    // Lưu trạng thái vai trò người dùng vào Local Storage
    localStorage.setItem("userRoles", JSON.stringify(updatedUsers));

    // Cập nhật dữ liệu trên API
    updateData("usersList", userID, { role: newRole })
      .then((res) => {
        // Xử lý thành công (nếu cần)
      })
      .catch((error) => {
        // Xử lý lỗi (nếu cần)
      });
  };

  const handleBlockUser = (userID: string) => {
    const userChange = users.find((user: UserList) => user.id === userID);
    if (userChange) {
      userChange.status = !userChange.status;

      // Cập nhật dữ liệu trên API
      updateData("usersList", userChange.id, userChange)
        .then((res) => {
          getDataUser();
        })
        .catch((error) => {
          // Xử lý lỗi (nếu cần)
        });
    }
  };

  useEffect(() => {
    // Kiểm tra nếu có trạng thái vai trò người dùng trong Local Storage, thì sử dụng nó
    const storedUserRoles = localStorage.getItem("userRoles");
    if (storedUserRoles) {
      setUsers(JSON.parse(storedUserRoles));
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        className="hanldeSearch"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="sec" onClick={handleClear}>
        Clear
      </button>
      <h1>User Management</h1>
      <table className="table-admin">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avt} alt="Avatar" width="50" height="50" />
                </td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <select
                    name="role"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td>
                  <button
                    className="pri"
                    onClick={() => handleBlockUser(user.id)}
                    style={user.status ? { background: "blue" } : {}}
                  >
                    {user.status ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
