import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Row, Col } from "react-bootstrap";

import { Route, Routes, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//manage routes
import AdminRoute from './component/ManageRoutes/AdminRoute';
//cart
import { CartProvider } from "./component/CartContext";
import Cart from "./component/Cart";
//common
import Footer from "./component/common/Footer";
import Home from "./component/Home";
import Product from "./component/Product";
import Login from "./component/Login";
import Navbar from "./component/common/Navbar";
import Verify from "./component/Verify";
import Success from "./component/common/PaymentReturn/Success";
import FailTransaction from "./component/common/PaymentReturn/FailTransaction";

//user
import UserProfile from "./component/User/UserProfile";
import Profile from "./component/User/Profile";
import AdminCreateBlog from './component/Admin/AdminCreateBlog';
import BlogList from './component/User/BlogList';
import BlogDetail from './component/User/BlogDetail';
import UserOrder from "./component/User/UserOrder";
import ProductList from "./component/Admin/ProductList";
//admin
import AdminHome from "./component/common/AdminHome";
import AddProduct from "./component/Admin/AddProduct";
import EditProduct from "./component/Admin/EditProduct";
import AddCategory from "./component/Admin/AddCategory";
import CategoryList from "./component/Admin/CategoryList";
import EditCategory from "./component/Admin/EditCategory";
import AdminManageBlog from "./component/Admin/AdminManageBlog";
import UserList from "./component/Admin/UserList";
import RegistrationForm from "./component/Register";
import ProductDetail from "./component/User/ProductDetail";
import ForgotPassword from "./component/ForgotPassWord";
import AdminEditBlog from "./component/Admin/AdminEditBlog";
import AdminDashboard from "./component/common/AdminDashBoard";
import RevenueTable from "./component/Admin/RevenueTable";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      // const user = JSON.parse(storedUser);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      // setUser(user);
    }
  }, []);
  const noNavbarPaths = ["/dashboard", "/login"];
  const noFooterPaths = ["/dashboard"];
  return (
    <CartProvider>
      {!noNavbarPaths.includes(location.pathname) && (
        <Navbar
          user={user}
          setUser={setUser}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {/* {user?.role !== "ADMIN" ? (
        <Navbar
          user={user}
          setUser={setUser}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <Navbar
          user={user}
          setUser={setUser}
          setIsAuthenticated={setIsAuthenticated}
        />
      )} */}

      <Row>
        <Col xs={12} sm={12} md={12}>
          <Routes>
          <Route
                path="/forgot"
                element={
                  <ForgotPassword/>
                }
              />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:blogId" element={<BlogDetail />} />
            <Route path="/products/:id" element={<ProductDetail user={user} isAuthenticated={isAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<UserOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/verify" element={<Verify />} />
            <Route path="/success" element={<Success />} />
            <Route path="/fail" element={<FailTransaction />} />
            <Route path="/dashboard" element={<AdminRoute Component={AdminDashboard} />} />
            <Route path="/manage/product" element={<AdminRoute Component={ProductList} />} />
            <Route path="/manage/add-product" element={<AdminRoute Component={AddProduct} />} />
            <Route path="/manage/product/edit/:id" element={<AdminRoute Component={EditProduct} />} />
            <Route path="/manage/categories" element={<AdminRoute Component={CategoryList} />} />
            <Route path="/manage/add-category" element={<AdminRoute Component={AddCategory} />} />
            <Route path="/manage/category/edit/:id" element={<AdminRoute Component={EditCategory} />} />
            <Route path="/manage/add-blog" element={<AdminRoute Component={AdminCreateBlog} />} />
            <Route path="/manage/blogs" element={<AdminRoute Component={AdminManageBlog} />} />
            <Route path="/manage/blog/edit/:id" element={<AdminRoute Component={AdminEditBlog}/> }/>
            <Route path="/manage/revenue/table" element={<AdminRoute Component={RevenueTable}/> }/>
            <Route path="/manage/customers" element={<UserList />} />
            <Route path="/manage/customer/view/:id" element={<UserProfile />} />
          </Routes>
          
          <ToastContainer />
        </Col>
      </Row>
      {!noNavbarPaths.includes(location.pathname) && (
        <Footer/>
      )}

    </CartProvider>
  );
}

export default App;