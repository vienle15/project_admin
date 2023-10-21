import React from "react";

function home() {
  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">
          This is a simple admin dashboard created with React and custom CSS.
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h5 className="card-title">Customers</h5>
            <p className="card-value">345k</p>
            <p className="card-text">Feb 1 - Apr 1, United States</p>
            <p className="card-text text-success">
              18.2% increase since last month
            </p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Revenue</h5>
            <p className="card-value">$2.4k</p>
            <p className="card-text">Feb 1 - Apr 1, United States</p>
            <p className="card-text text-success">
              4.6% increase since last month
            </p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Purchases</h5>
            <p className="card-value">43</p>
            <p className="card-text">Feb 1 - Apr 1, United States</p>
            <p className="card-text text-danger">
              2.6% decrease since last month
            </p>
          </div>

          <div className="dashboard-card">
            <h5 className="card-title">Traffic</h5>
            <p className="card-value">64k</p>
            <p className="card-text">Feb 1 - Apr 1, United States</p>
            <p className="card-text text-success">
              2.5% increase since last month
            </p>
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

export default home;
