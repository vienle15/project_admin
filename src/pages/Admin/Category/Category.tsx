import React, { ChangeEvent, useEffect, useState } from "react";
import Categories from "../../../entities/category.entity";
import Product from "../../../entities/product.entity";
import { Box, Button, TextField } from "@mui/material";
import {
  createData,
  deleteData,
  getData,
  updateData,
} from "../../Services/API";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, Paper, Typography } from "@mui/material";

function Category() {
  const [category, setCategory] = useState<Categories[]>([]);
  const [product, setProduct] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalCategory, setOriginalCategory] = useState<Categories[]>([]);

  const columns: GridColDef[] = [
    {
      field: "categoryname",
      headerName: "Category Name",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryId",
      headerName: "Category ID",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleViewDetails(params.row.categoryId)}
            variant="contained"
            className="pri"
          >
            Xem
          </Button>
          <Button
            onClick={() => handleOpenEdit(params.row.categoryId)}
            variant="contained"
            color="primary"
            className="Sec"
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteCategory(params.row.categoryId)}
            variant="contained"
            color="secondary"
            className="trd"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  async function fetchCategory() {
    const getCategory = await getData("category");
    setCategory(getCategory);
    setOriginalCategory(getCategory);
  }

  async function fetchProduct() {
    const getProduct = await getData("products");
    setProduct(getProduct);
  }

  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategory(originalCategory);
  };

  const handleOpenEdit = async (id: string) => {
    const selectedCategory = category.find(
      (category) => category.categoryId === id
    );
    setAction("edit");
    setSelectedCategory(selectedCategory || null);
    setModalOpen(true);
  };

  const handleAddModal = () => {
    setModalOpen(true);
    setAction("add");
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setAction("");
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteData("category", id);
    fetchCategory();
  };

  const handleViewDetails = (id: string) => {
    const selectedCategory = category.find(
      (category) => category.categoryId === id
    );
    if (selectedCategory) {
      setAction("view");
      setSelectedCategory(selectedCategory);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const filterCategory = originalCategory.filter((category) => {
      if (category && category.categoryname) {
        return category.categoryname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setCategory(filterCategory);
  }, [searchTerm, originalCategory]);

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Quản lý danh mục</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "160px",
            marginBottom: "10px",
          }}
        >
          <Button
            className="pri"
            variant="contained"
            color="primary"
            onClick={handleAddModal}
          >
            Thêm Danh Mục
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              label="Tìm kiếm"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              size="small"
            />
            <Button
              className="sec"
              variant="contained"
              color="primary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <div style={{ width: "155px" }}></div>
        </div>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            className="disabled-focus"
            rows={category}
            columns={columns}
            getRowId={(row) => row.categoryId}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Box>
      <CategoryModal
        category={selectedCategory}
        open={isModalOpen}
        onClose={handleClose}
        product={product}
        action={action}
        fetchCategory={fetchCategory}
      />
    </>
  );
}

interface CategoryModalProps {
  category: Categories | null;
  open: boolean;
  onClose: () => void;
  product: Product[] | null;
  action: string;
  fetchCategory: () => void; // Thay đổi kiểu của fetchCategory
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  open,
  onClose,
  product,
  action,
  fetchCategory,
}) => {
  const [formData, setFormData] = useState<Categories>({
    categoryId: "",
    categoryname: "",
    list: [],
  });

  const handleAddCategory = async () => {
    const newCategory = {
      categoryId: formData.categoryId,
      categoryname: formData.categoryname,
      list: formData.list,
    };
    await createData("category", newCategory);
    fetchCategory(); // Gọi fetchCategory để cập nhật danh sách sau khi thêm
    onClose();
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = {
      categoryId: formData.categoryId,
      categoryname: formData.categoryname,
      list: formData.list,
    };

    await updateData("category", formData.categoryId, updatedCategory);
    fetchCategory(); // Gọi fetchCategory để cập nhật danh sách sau khi sửa
    onClose();
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        categoryId: "",
        categoryname: "",
        list: [],
      });
    }
  }, [category]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thông tin danh mục
        </Typography>

        <Paper
          sx={{ p: 2, maxWidth: "800px", maxHeight: "600px", overflow: "auto" }}
        >
          <form>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="categoryId">ID</label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                onChange={handleInputChange}
                value={formData.categoryId}
                style={{ width: "100%", fontSize: 16, padding: 9 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label htmlFor="categoryname">Category Name</label>
              <input
                type="text"
                id="categoryname"
                name="categoryname"
                onChange={handleInputChange}
                value={formData.categoryname}
                style={{ width: "100%", fontSize: 16, padding: 9 }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label htmlFor="list">Product List</label>
              <input
                type="text"
                id="list"
                value={
                  formData.list && formData.list.length > 0
                    ? formData.list
                        .map(
                          (item) =>
                            product?.find((list) => list.productId === item)
                              ?.productName
                        )
                        .join(", ")
                    : ""
                }
                style={{ width: "100%", fontSize: 16, padding: 9 }}
                readOnly
              />
            </div>
          </form>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={onClose}
        >
          Đóng
        </Button>
        {action !== "view" ? (
          action === "add" ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleAddCategory}
            >
              Thêm
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleUpdateCategory}
            >
              Sửa
            </Button>
          )
        ) : null}
      </Box>
    </Modal>
  );
};

export default Category;
