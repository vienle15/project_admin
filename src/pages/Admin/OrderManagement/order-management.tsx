import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderList from "../../../entities/orderList.entity";

function OrderManagement() {
  const [orders, setOrders] = useState<OrderList[]>([]); // State để lưu trữ dữ liệu
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalOrders, setOriginalOrders] = useState<OrderList[]>([]); // Sao lưu danh sách đơn hàng gốc

  useEffect(() => {
    // Sử dụng Axios để lấy dữ liệu từ API hoặc tệp JSON
    axios.get("http://localhost:3000/orders").then((response) => {
      setOrders(response.data);
      setOriginalOrders(response.data); // Sao lưu danh sách đơn hàng gốc
    });
  }, []); // Khi tham số thứ hai là mảng rỗng, `useEffect` sẽ chỉ chạy sau khi component được render lần đầu.

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setOrders(originalOrders); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  useEffect(() => {
    // Lọc danh sách đơn hàng dựa trên từ khóa tìm kiếm
    const filteredOrders = originalOrders.filter((order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOrders(filteredOrders);
  }, [searchTerm, originalOrders]);

  return (
    <div>
      <input
        type="text"
        className="hanldeSearch"
        placeholder="Search by customer"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="pri" onClick={handleClear}>
        Clear
      </button>
      <h1>Order Management</h1>
      <table className="table-admin">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderID}>
              <td>{order.date}</td>
              <td>{order.customer}</td>
              <td>{order.phone}</td>
              <td>{order.orderID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
