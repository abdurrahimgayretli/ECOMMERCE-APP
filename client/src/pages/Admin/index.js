import { Box } from "@chakra-ui/react";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Orders from "./Orders";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import NewProduct from "./Products/new";
import "./styles.css";

export default function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="orders">Orders</Link>
          </li>
          <li>
            <Link to="products">Products</Link>
          </li>
          <li>
            <Link to="products/new">New Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt="10">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/:product_id" element={<ProductDetail />} />
        </Routes>
      </Box>
    </div>
  );
}
