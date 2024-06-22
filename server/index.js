require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
const db = new pg.Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "users",
  password: process.env.DB_PASSWORD || "1250",
  port: process.env.DB_PORT || 5432,
});
db.connect((error) => {
  if (error) {
    console.log("failed to connect to postgres database");
  } else {
    console.log("connected to postgres database");
  }
});

app.get("/api/getItem", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "success",
          items: result.rows,
        });
      }
    });
  } catch (err) {
    console.error("Error registering Items:", err);
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
});
app.post("/api/addItem", async (req, res) => {
  const { productName, productDesc, productAmount } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO items (productName, productDesc, productAmount) VALUES ($1, $2, $3) RETURNING *",
      [productName, productDesc, productAmount]
    );

    if (result.rows.length > 0) {
      const insertedItem = result.rows[0];
      res.status(201).json({
        message: "success",
        item: insertedItem,
      });
    } else {
      res.status(500).json({
        message: "error",
        error: "Failed to insert item. No rows returned from database.",
      });
    }
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
});

app.get("/api/getItems/:Id", (req, res) => {
  const productId = req.params.Id;
  db.query(
    "SELECT * FROM items WHERE productId = $1",
    [productId],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Error fetching item",
          error: error.message,
        });
      } else {
        res.status(200).json({
          message: "success",
          item: result.rows[0],
        });
      }
    }
  );
});
app.put("/api/update/:productId", (req, res) => {
  const productId = req.params.productId;
  const { productName, productDesc, productAmount } = req.body;

  try {
    db.query(
      "UPDATE items SET productName = $1, productDesc = $2, productAmount = $3 WHERE productid = $4",
      [productName, productDesc, productAmount, productId],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Error Updating item",
            productId: productId,
            error: error.message,
          });
        } else {
          db.query(
            "SELECT * FROM items WHERE productid = $1",
            [productId],
            (error, result) => {
              if (error) {
                console.log(error);
                res.status(500).json({
                  message: "Error fetching updated item",
                  error: error.message,
                });
              } else {
                res.status(200).json({
                  message: "Update item success",
                  productId: productId,
                  result: result.rows[0],
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({
      message: "Error updating item",
      error: err.message,
    });
  }
});
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (typeof password !== "string") {
      throw new Error("password must be a string");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, passwordHash]
    );
    res.status(201).json({
      message: "success",
      result: result.rows[0],
    });
  } catch (err) {
    console.log("Error registering user :", err);
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
});

app.delete("/api/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM items WHERE productId = $1 RETURNING *",
      [productId]
    );
    if (result.rows.length > 0) {
      const deletedItem = result.rows[0];
      res.status(200).json({
        message: "Delete Success",
        item: deletedItem,
      });
    } else {
      res.status(500).json({
        message: "error",
        error: "Failed to delete item. No rows returned from database.",
      });
    }
  } catch (err) {
    console.error("Error registering Items:", err);
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).send({
        message: "user not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({
        message: "incorrect password",
      });
    }
    const token = jwt.sign(
      {
        username,
      },
      process.env.SESSION_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.send({
      message: "login successful",
      token,
    });
  } catch (err) {
    console.log("Error logging in user :", err);
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let authToken = "";

    if (authHeader) {
      authToken = authHeader.split(" ")[1]; // แยกค่า token
    }

    console.log("authToken: ", authToken);
    const decodedToken = jwt.verify(authToken, process.env.SESSION_SECRET);
    console.log("decodedToken: ", decodedToken);

    const username = decodedToken.username;

    const checkResult = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (checkResult.rows.length === 0) {
      throw {
        message: "User not found",
        error: "User not found",
      };
    }

    const allUsersResult = await db.query("SELECT * FROM users");

    res.status(200).json({
      users: allUsersResult.rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});
app.listen(port, async (req, res) => {
  console.log(`Server is running on port ${port}`);
});
