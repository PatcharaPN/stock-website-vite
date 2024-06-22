import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function UpdatePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const added = () => {
    toast.success("Added item", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const deleted = () => {
    toast.success("Deleted Success", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showError = () => {
    toast.error("Invalid Input Error", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/getItem");
      if (response.data.message === "success") {
        setData(response.data.items);
      } else {
        console.error("Error fetching data:", response.data.error);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData([]);
    }
    setLoading(false);
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/delete/${productId}`
      );
      if (res.status === 200) {
        deleted();
        console.log("Product deleted successfully:", res.data);
        const updatedData = data.filter((item) => item.productid !== productId);
        setData(updatedData);
      } else {
        console.log(res.data.message, res.data);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    console.log(productId);
  };

  const updateProduct = async (productId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/update/${productId}`,
        {
          productName,
          productDesc,
          productAmount,
        }
      );
      if (res.status === 200) {
        console.log("Product updated successfully:", res.data);
        fetchData();
      } else {
        console.log(res.data.message, res.data);
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
    console.log(productId);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescChange = (event) => {
    setProductDesc(event.target.value);
  };

  const handleProductAmountChange = (event) => {
    setProductAmount(event.target.value);
  };

  const addItem = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/addItem", {
        productName,
        productDesc,
        productAmount,
      });
      console.log(res.data);
      fetchData();
      setProductName("");
      setProductDesc("");
      setProductAmount("");
      added();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showError(error.response ? error.response.data : error.message);
    }
  };

  const handleOpenModal = (product) => {
    setEditProductId(product.productid);
    setProductName(product.productname);
    setProductDesc(product.productdesc);
    setProductAmount(product.productamount);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditProductId(null);
    setProductName("");
    setProductDesc("");
    setProductAmount("");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const editItem = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/update/${editProductId}`,
        {
          productName,
          productDesc,
          productAmount,
        }
      );
      console.log(res.data);
      fetchData();
      handleCloseModal();
      toast.success("Product updated successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showError(error.response ? error.response.data : error.message);
    }
  };

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.productid.toString().includes(search) ||
      item.productname.toLowerCase().includes(search.toLowerCase()) ||
      item.productdesc.toLowerCase().includes(search.toLowerCase())
  );

  // Group and sum amounts for items with the same description
  const groupedData = filteredData.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.productdesc === item.productdesc);
    if (existingItem) {
      existingItem.productamount += item.productamount;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white h-[100px] col-span-2 rounded-xl">
        <div className="flex justify-start mx-5 my-5 text-[2rem] items-center gap-3">
          <Icon icon="mage:edit-fill" />
          Update Stock Items
        </div>
      </div>

      <div className="bg-white h-[150px] col-span-2 rounded-xl ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <input
                    onChange={handleProductNameChange}
                    value={productName}
                    type="text"
                    placeholder="Product Name"
                    className="w-[200px] h-10 px-3 rounded-md border-2 border-black opacity-50"
                  />
                </TableCell>
                <TableCell align="left">
                  <input
                    onChange={handleProductDescChange}
                    value={productDesc}
                    type="text"
                    placeholder="Product Description"
                    className="w-[200px] h-10 px-3 rounded-md border-2 border-black opacity-50"
                  />
                </TableCell>
                <TableCell align="left">
                  <input
                    onChange={handleProductAmountChange}
                    value={productAmount}
                    type="text"
                    placeholder="Amount"
                    className="w-[100px] h-10 px-3 rounded-md border-2 border-black opacity-50"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" onClick={addItem}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="bg-white h-[100px] col-span-2 rounded-xl">
        <div className="flex justify-start mx-5 my-5 text-[2rem] items-center gap-3">
          <TextField
            className="w-full h-[10px]"
            id="search-field"
            label="Search item..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="bg-white h-[100px] col-span-2 rounded-xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedData.map((product) => (
                <TableRow key={product.productid}>
                  <TableCell>{product.productid}</TableCell>
                  <TableCell>{product.productname}</TableCell>
                  <TableCell>{product.productdesc}</TableCell>
                  <TableCell>{product.productamount}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteProduct(product.productid)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Edit Product</h2>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            value={productName}
            onChange={handleProductNameChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Description"
            value={productDesc}
            onChange={handleProductDescChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Amount"
            value={productAmount}
            onChange={handleProductAmountChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={editItem}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default UpdatePage;
