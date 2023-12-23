import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import AddBlog from './pages/AddBlog';
import BlogList from "./pages/BlogList";
import AddBlogCat from './pages/AddBlogCat';
import BlogCatList from './pages/BlogCatList';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import Orders from './pages/Order';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import AddBrand from './pages/AddBrand';
import BrandList from './pages/BrandList';
import AddCat from './pages/AddCat';
import CategoryList from './pages/CategoryList';
import AddColor from './pages/AddColor';
import ColorList from './pages/ColorList';
import Customers from './pages/Customers';
import ViewEnq from './pages/ViewEnq';
import ViewOrders from './pages/ViewOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ViewEnq />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog-category" element={<AddBlogCat />} />
            <Route path="blog-category/:id" element={<AddBlogCat />} />
            <Route path="blog-category-list" element={<BlogCatList />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="coupon-list" element={<CouponList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrders />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="category" element={<AddCat />} />
            <Route path="category/:id" element={<AddCat />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="customers" element={<Customers />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;