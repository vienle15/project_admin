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
    productId: "",
    productCode: "",
    productName: "",
    productPrice: "",
    productQuantity: 0,
    productSize: "",
    productImg: "",
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Fetch products data when the component mounts
    axios.get("http://localhost:6543/api/v1/products").then((response) => {
      setProducts(response.data);
      setOriginalProducts(response.data);
    });
  }, []);
  useEffect(() => {
    // Filter products when searchTerm or originalProducts change
    if (searchTerm === "") {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchTerm, originalProducts]);
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    // Kiểm tra giá trị có tồn tại hay không trước khi gọi toLowerCase()
    const searchTerm = value ? value.toLowerCase() : "";
    setSearchTerm(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
  };
  const handleDeleteProduct = async (id: string) => {
    await deleteData("products", id);
    const updatedProducts = products.filter(
      (product) => product.productId !== id
    );
    setProducts(updatedProducts);
  };
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
        productId: "",
        productCode: "",
        productName: "",
        productPrice: "",
        productQuantity: 0,
        productSize: "",
        productImg: "",
      });
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct({
          ...newProduct,
          productImg: e.target?.result as string,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>({
    productId: "",
    productCode: "",
    productName: "",
    productPrice: "",
    productQuantity: 0,
    productSize: "",
    productImg: "",
  });

  const openEditModal = (product: Product) => {
    console.log(111, product);

    setEditProduct(product);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const handleEditInputChange = (field: string, value: any) => {
    setEditProduct({ ...editProduct, [field]: value });
  };

  const handleEditImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditProduct({
          ...editProduct,
          productImg: e.target?.result as string,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(123123, editProduct);

    try {
      // Gửi yêu cầu PUT để chỉnh sửa sản phẩm
      const response = await axios.put(
        `http://localhost:6543/api/v1/products/${editProduct.productId}`,
        editProduct
      );

      if (response.status === 200) {
        // Cập nhật state sản phẩm đã chỉnh sửa
        const updatedProducts = products.map((product) =>
          product.productId === editProduct.productId ? editProduct : product
        );
        setProducts(updatedProducts);

        // Đóng modal chỉnh sửa sản phẩm
        setEditModalVisible(false);
      } else {
        console.error("Lỗi khi chỉnh sửa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa sản phẩm:", error);
    }
  };
  console.log(11111111, products);

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
            <tr key={product.productId}>
              <td>
                <img
                  src={product.productImg}
                  alt="Avatar"
                  width="50"
                  height="50"
                />
              </td>
              <td>{product.productId}</td>
              <td>{product.productCode}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}$</td>
              <td>{product.productQuantity}</td>
              <td>{product.productSize}</td>
              <td>
                <button className="pri" onClick={() => openEditModal(product)}>
                  Edit
                </button>
                <button
                  className="sec"
                  onClick={() => handleDeleteProduct(product.productId)}
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
              <label className="input-label">Name:</label>
              <input
                type="text"
                value={newProduct.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                className="input-field"
              />
              <label className="input-label">Image:</label>
              <input
                type="file"
                accept="productImg/*"
                onChange={handleImageChange}
                className="input-field"
              />
              <img
                src={newProduct.productImg}
                alt="Preview"
                className="preview-productImg"
              />
              <label className="input-label">Id:</label>
              <input
                type="text"
                value={newProduct.productId}
                onChange={(e) => handleInputChange("id", e.target.value)}
                className="input-field"
              />
              <label className="input-label">productCode:</label>
              <input
                type="text"
                value={newProduct.productCode}
                onChange={(e) =>
                  handleInputChange("productCode", e.target.value)
                }
                className="input-field"
              />
              <label className="input-label">Price:</label>
              <input
                type="text"
                value={newProduct.productPrice}
                onChange={(e) =>
                  handleInputChange("productPrice", e.target.value)
                }
                className="input-field"
              />
              <label className="input-label">Quantity:</label>
              <input
                type="text"
                value={newProduct.productQuantity}
                onChange={(e) =>
                  handleInputChange("productQuantity", parseInt(e.target.value))
                }
                className="input-field"
              />
              <label className="input-label">Size:</label>
              <input
                type="text"
                value={newProduct.productSize}
                onChange={(e) =>
                  handleInputChange("productSize", e.target.value)
                }
                className="input-field"
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      {editModalVisible && (
        <div>
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="input-label">Name:</label>
              <input
                type="text"
                value={editProduct.productName}
                onChange={(e) =>
                  handleEditInputChange("productName", e.target.value)
                }
                className="input-field"
              />
              <label className="input-label">Image:</label>
              <input
                type="file"
                accept="productImg/*"
                onChange={handleEditImageChange}
                className="input-field"
              />
              <img
                src={editProduct.productImg}
                alt="Preview"
                className="preview-productImg"
              />
              <label className="input-label">Id:</label>
              <input
                type="text"
                value={editProduct.productId}
                onChange={(e) => handleEditInputChange("id", e.target.value)}
                disabled
                className="input-field"
              />
              <label className="input-label">productCode:</label>
              <input
                type="text"
                value={editProduct.productCode}
                onChange={(e) =>
                  handleEditInputChange("productCode", e.target.value)
                }
                disabled
                className="input-field"
              />
              <label className="input-label">Price:</label>
              <input
                type="text"
                value={editProduct.productPrice}
                onChange={(e) =>
                  handleEditInputChange("productPrice", e.target.value)
                }
                className="input-field"
              />
              <label className="input-label">Quantity:</label>
              <input
                type="text"
                value={editProduct.productQuantity}
                onChange={(e) =>
                  handleEditInputChange(
                    "productQuantity",
                    parseInt(e.target.value)
                  )
                }
                className="input-field"
              />
              <label className="input-label">Size:</label>
              <input
                type="text"
                value={editProduct.productSize}
                onChange={(e) =>
                  handleEditInputChange("productSize", e.target.value)
                }
                className="input-field"
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
