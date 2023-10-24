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
      headerName: "category name",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "category id",
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
            onClick={() => handleViewDetails(params.row.id)}
            variant="contained"
            className="pri"
            // style={{
            //   backgroundColor: "blue",
            //   color: "white",
            //   cursor: "pointer",
            // }}
          >
            Xem
          </Button>
          <Button
            onClick={() => handleOpenEdit(params.row.id)}
            variant="contained"
            color="primary"
            className="Sec"
            // style={{
            //   marginLeft: 5,
            //   cursor: "pointer",
            // }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteCourse(params.row.id)}
            variant="contained"
            color="secondary"
            className="trd"
            // style={{
            //   marginLeft: 5,
            //   cursor: "pointer",
            // }}
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
  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setCategory(originalCategory); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const handleOpenEdit = async (id: string) => {
    const course = category.find((course) => course.id === id);
    setAction("edit");
    setSelectedCategory(course || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setAction("");
  };

  const handleDeleteCourse = async (id: string) => {
    await deleteData("category", id);
    fetchCategory();
  };

  const handleViewDetails = (id: string) => {
    const course = category.find((course) => course.id === id);
    if (course) {
      setAction("view");
      setSelectedCategory(course);
      setModalOpen(true);
    }
  };
  useEffect(() => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filterCategory = originalCategory.filter((coures) => {
      if (coures && coures.categoryname) {
        return coures.categoryname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false; // Nếu user hoặc user.username không xác định, bỏ qua
    });
    setCategory(filterCategory); // Cập nhật danh sách người dùng
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
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Box>
      <CategoryModal
        category={selectedCategory}
        open={isModalOpen}
        onClose={hanldeClose}
        product={product}
        action={action}
        fetchCategory={fetchCategory}
      />
    </>
  );
}

export default Category;

interface CategoryModalProps {
  category: Categories | null;
  open: boolean;
  onClose: () => void;
  product: Product[] | null;
  action: string;
  fetchCategory: Function;
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
    id: "",

    categoryname: "",

    list: [],
  });
  const handleAddCourse = async () => {
    const newCategory = {
      id: formData.id,
      categoryname: formData.categoryname,

      list: formData.list,
    };
    await createData("category", newCategory);
    fetchCategory();
    onClose();
  };

  const handleUpdateCourse = async () => {
    // Tạo đối tượng mới chứa thông tin cần sửa
    const updatedCategory = {
      id: formData.id,
      categoryname: formData.categoryname,

      list: formData.list,
    };

    await updateData("category", formData.id, updatedCategory);
    fetchCategory();

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
        id: "",

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
              <label htmlFor="id">ID</label>
              <input
                type="text"
                id="id"
                name="id"
                onChange={handleInputChange}
                value={formData.id}
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
              <label htmlFor="list">product list</label>
              <input
                type="text"
                id="list"
                value={
                  formData.list
                    .map(
                      (item) =>
                        product?.find((list) => list.id == item)?.productName
                    )
                    .join(", ") || ""
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
              onClick={handleAddCourse}
            >
              Thêm
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleUpdateCourse}
            >
              Sửa
            </Button>
          )
        ) : null}
      </Box>
    </Modal>
  );
};
