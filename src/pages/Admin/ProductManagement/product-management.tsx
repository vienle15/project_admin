import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../../entities/product.entity";
import { deleteData, createData } from "../../Services/API";
import "../../../App.css";

function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);

  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    productCode: "",
    productName: "",
    productPrice: "",
    productQuantity: 0,
    productSize: "",
    image: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
      setOriginalProducts(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setProducts(originalProducts);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteData("products", id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createData("products", newProduct);

    if (response) {
      setProducts((prevProducts) => [...prevProducts, response]);
      closeModal();
      setNewProduct({
        id: "",
        productCode: "",
        productName: "",
        productPrice: "",
        productQuantity: 0,
        productSize: "",
        image: "",
      });
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setProducts(originalProducts);
    } else {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchTerm, originalProducts, products]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setNewProduct({
          ...newProduct,
          image: e.target?.result as string,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="hanldeSearch"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="sec" onClick={handleClear}>
        Clear
      </button>
      <h1>Product Management</h1>
      <button className="pri add-product-btn" onClick={openModal}>
        Add Product
      </button>
      <table className="table-admin">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt="Avatar" width="50" height="50" />
              </td>
              <td>{product.id}</td>
              <td>{product.productCode}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}$</td>
              <td>{product.productQuantity}</td>
              <td>{product.productSize}</td>
              <td>
                <button className="pri">Edit</button>
                <button
                  className="sec"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={newProduct.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
              />
              <label>Image:</label>
              <input
                type="file"
                accept="image/*" /* Chỉ cho phép tệp hình ảnh */
                onChange={handleImageChange}
              />
              <img
                src={newProduct.image}
                alt="Preview"
                className="preview-image"
              />

              <label>Id:</label>
              <input
                type="text"
                value={newProduct.id}
                onChange={(e) =>
                  handleInputChange("id", parseFloat(e.target.value))
                }
              />
              <label>productCode:</label>
              <input
                type="text"
                value={newProduct.productCode}
                onChange={(e) =>
                  handleInputChange("productCode", e.target.value)
                }
              />
              <label>Price:</label>
              <input
                type="text"
                value={newProduct.productPrice}
                onChange={(e) =>
                  handleInputChange("productPrice", e.target.value)
                }
              />
              <label>Quantity:</label>
              <input
                type="text"
                value={newProduct.productQuantity}
                onChange={(e) =>
                  handleInputChange("productQuantity", parseInt(e.target.value))
                }
              />
              <label>Size:</label>
              <input
                type="text"
                value={newProduct.productSize}
                onChange={(e) =>
                  handleInputChange("productSize", e.target.value)
                }
              />

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
