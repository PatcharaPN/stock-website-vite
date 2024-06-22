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

      <div className="bg-white h-[550px] col-span-2 rounded-xl">
        <TableContainer component={Paper} className="h-full">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  Product ID
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  Product Description
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              className="overflow-y-auto"
              style={{ maxHeight: "450px" }}
            >
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" height={"400"}>
                    <div className="font-bold">Data not found</div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.productid}>
                    <TableCell component="th" align="left" scope="row">
                      {row.productid}
                    </TableCell>
                    <TableCell align="center">{row.productname}</TableCell>
                    <TableCell align="center">{row.productdesc}</TableCell>
                    <TableCell align="center">{row.productamount}</TableCell>
                    <TableCell align="center">
                      <div className="flex flex-row gap-2 justify-center items-center mt-2">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleOpenModal(row)}
                          startIcon={<Icon icon="ic:outline-edit" />}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => deleteProduct(row.productid)}
                          startIcon={<Icon icon="ic:outline-delete" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
            width: 500,
            borderRadius: "20px",
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <h2>Edit Product</h2>
          <TextField
            label="Product Name"
            value={productName}
            onChange={handleProductNameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Description"
            value={productDesc}
            onChange={handleProductDescChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            value={productAmount}
            onChange={handleProductAmountChange}
            fullWidth
            margin="normal"
          />
          <div className="flex justify-end mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={editItem}
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default UpdatePage;
