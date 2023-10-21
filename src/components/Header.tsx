import React from "react";

function Header() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/index.html">
              VShoes
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="/index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="src/pages/customer/products/index.html"
                  >
                    Products
                  </a>
                </li>
              </ul>
              <div className="d-flex feature" role="search" id="navbar-feature">
                <a href="/src/pages/customer/cart/index.html">
                  <i className="fa-solid fa-cart-plus fa-beat" />
                </a>
                <a href="">
                  <i className="fa-solid fa-user fa-beat" />
                </a>
                <a href="" className="btn btn-outline-success">
                  Login
                </a>
                <a
                  href="/src/pages/auth/login/index.html"
                  className="btn btn-outline-info"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
