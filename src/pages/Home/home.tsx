import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [userData, setUserData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    // Địa chỉ URL của JSON server cho từng tài nguyên
    const userApiUrl = "http://localhost:6543/api/v1/users";
    const productApiUrl = "http://localhost:6543/api/v1/products";

    const orderApiUrl = " http://localhost:6543/api/v1/order";

    // Hàm lấy dữ liệu từ API bằng Axios
    const fetchData = async (
      apiUrl: string,
      setData: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Gọi hàm fetchData để lấy dữ liệu từ các tài nguyên
    fetchData(userApiUrl, setUserData);
    fetchData(productApiUrl, setProductData);

    fetchData(orderApiUrl, setOrderData);
  }, []);
  // Tính toán tổng users, japaneseCourses, lessons và doanh thu
  const totalUsers = userData.length;
  const totalProducts = productData.length;

  const totalOrders = orderData.length;
  const totalRevenue = orderData.reduce((total, order) => {
    return total + parseInt(order.price, 10);
  }, 0);
  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">
          This is a simple admin dashboard created with React and custom CSS.
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h5 className="card-title">Customers Count</h5>
            <p className="card-value">{totalUsers}</p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Products Count</h5>
            <p className="card-value">{totalProducts}</p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Order Count</h5>
            <p className="card-value">{totalOrders}</p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Total Money</h5>
            <p className="card-value">{totalRevenue}$</p>
          </div>
        </div>

        <div className="dashboard-transactions">
          <h5 className="card-title">Latest transactions</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">17371705</th>
                <td>Volt Premium Bootstrap 5 Dashboard</td>
                <td>johndoe@gmail.com</td>
                <td>€61.11</td>
                <td>Aug 31, 2020</td>
                <td>
                  <a href="#" className="btn btn-primary btn-sm">
                    View
                  </a>
                </td>
              </tr>
              {/* Add more transaction rows here */}
            </tbody>
          </table>
          <a href="#" className="btn btn-light btn-block">
            View all
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
