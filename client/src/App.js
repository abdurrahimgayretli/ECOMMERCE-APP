import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            <Route element={<ProtectedRoute admin={false} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute admin={true} />}>
              <Route path="admin/*" element={<Admin />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
