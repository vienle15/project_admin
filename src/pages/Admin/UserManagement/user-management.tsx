import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../../../entities/userList.entity";

function UserManagement() {
  const [users, setUsers] = useState<UserList[]>([]); // State để lưu trữ dữ liệu
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalUsers, setOriginalUsers] = useState<UserList[]>([]); // Sao lưu danh sách người dùng gốc

  useEffect(() => {
    // Sử dụng Axios để lấy dữ liệu từ tệp JSON
    axios.get("http://localhost:3000/usersList").then((response) => {
      setUsers(response.data);
      setOriginalUsers(response.data); // Sao lưu danh sách người dùng gốc
    });
  }, []);

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = () => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setUsers(originalUsers); // Đặt lại danh sách người dùng bằng danh sách gốc
  };

  useEffect(() => {
    if (searchTerm === "") {
      setUsers(originalUsers); // Nếu trường tìm kiếm trống, khôi phục danh sách người dùng
    } else {
      // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
      const filteredUsers = originalUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  }, [searchTerm, originalUsers]);

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
          {users.map((user) => (
            <tr key={user.userID}>
              <td>
                <img src={user.avt} alt="Avatar" width="50" height="50" />
              </td>
              <td>{user.userID}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <select name="role" value={user.email}>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </td>
              <td>
                <button className="pri">Block</button>
                <button className="sec">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
