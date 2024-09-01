import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./pages/Home";
import Contact from "./pages/Contects";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ShipingPolicy from "./pages/ShipingPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import CheckOut from "./pages/CheckOut";
import { store } from "../src/app/Store";
import { Provider } from "react-redux";
import PrivateRoutes from "./routing/PrivateRoutes";
import OpenRoutes from "./routing/OpenRoutes";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Layouts />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<OurStore />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoutes>
                    <Cart />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoutes>
                    <Orders />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoutes>
                    <Profile />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/check-out"
                element={
                  <PrivateRoutes>
                    <CheckOut />
                  </PrivateRoutes>
                }
              />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="/compare-product" element={<CompareProduct />} />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoutes>
                    <Wishlist />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/login"
                element={
                  <OpenRoutes>
                    <Login />
                  </OpenRoutes>
                }
              />
              <Route
                path="/register"
                element={
                  <OpenRoutes>
                    <Register />
                  </OpenRoutes>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/shiping-policy" element={<ShipingPolicy />} />
              <Route
                path="/terms-and-condition"
                element={<TermsAndCondition />}
              />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
