import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Addresses from "./pages/shop/userProfile/Addresses";
import Cart from "./pages/shop/Cart";
import Home from "./pages/shop/Home";
import Login from "./pages/Login";
import PagenotFound from "./pages/PagenotFound";
import Product from "./pages/shop/Product";
import ProductListing from "./pages/shop/ProductListing";
import Profile from "./pages/shop/userProfile/Profile";
import Signup from "./pages/Signup";
import Wishlist from "./pages/shop/Wishlist";
import {
  getAccessToken,
  getUser,
  loginwithtoken,
} from "./redux/slice/authSlice";
import ClientAuth from "./security/ClientAuth";
import RequireAuth from "./security/RequireAuth";
import AddAddress from "./pages/shop/userProfile/AddAddress";
import EditAddress from "./pages/shop/userProfile/EditAddress";
import ReviewsHistory from "./pages/shop/userProfile/ReviewsHistory";
import OrderHistory from "./pages/shop/userProfile/OrderHistory";
import ManageOrder from "./pages/shop/userProfile/ManageOrder";
import Checkout from "./pages/shop/checkout/Checkout";
import Categories from "./pages/shop/Categories";
import Brands from "./pages/shop/Brands";
import SingleBrand from "./pages/shop/SingleBrand";
import SingleCategory from "./pages/shop/SingleCategory";
import { fetchINRvalue } from "./redux/slice/daiSlice";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import BrandAll from "./pages/admin/BrandAll";
import CategoriesAll from "./pages/admin/CategoriesAll";
import Products from "./pages/admin/Products";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const user = useSelector(getUser);

  useEffect(() => {
    if (token && !user) {
      dispatch(loginwithtoken(token));
    }
    dispatch(fetchINRvalue());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ClientAuth />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<SingleCategory />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:id" element={<SingleBrand />} />
          <Route path="product/:id" element={<Product />} />
        </Route>

        <Route path="/" element={<RequireAuth allowedRole="CUSTOMER" />}>
          <Route path="profile">
            <Route path="address" element={<Addresses />} />
            <Route path="address/add" element={<AddAddress />} />
            <Route path="address/edit/:id" element={<EditAddress />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<ManageOrder />} />
            <Route path="reviews" element={<ReviewsHistory />} />
            <Route path="my" element={<Profile />} />
            <Route
              path=""
              element={<Navigate to="/profile/my" replace={true} />}
            />
          </Route>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin" element={<RequireAuth allowedRole="ADMIN" />}>
          <Route index element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<CategoriesAll />} />
          <Route path="brands" element={<BrandAll />} />
          <Route path="dashboard" element={<p>Admin dashboard</p>} />
          <Route path="*" element={<p>Admin side pages</p>} />
        </Route>

        <Route path="/*" element={<PagenotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
