import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Addresses from "./pages/userProfile/Addresses";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagenotFound from "./pages/PagenotFound";
import Product from "./pages/Product";
import ProductListing from "./pages/ProductListing";
import Profile from "./pages/userProfile/Profile";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import {
  getAccessToken,
  getUser,
  loginwithtoken,
} from "./redux/slice/authSlice";
import ClientAuth from "./security/ClientAuth";
import RequireAuth from "./security/RequireAuth";
import AddAddress from "./pages/userProfile/AddAddress";
import EditAddress from "./pages/userProfile/EditAddress";
import ReviewsHistory from "./pages/userProfile/ReviewsHistory";
import OrderHistory from "./pages/userProfile/OrderHistory";
import ManageOrder from "./pages/userProfile/ManageOrder";
import Checkout from "./pages/checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const user = useSelector(getUser);

  useEffect(() => {
    if (token && !user) {
      dispatch(loginwithtoken(token));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ClientAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<ProductListing />} />
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
          <Route path="dashboard" element={<p>Admin dashboard</p>} />
          <Route path="*" element={<p>Admin side pages</p>} />
        </Route>

        <Route path="/*" element={<PagenotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
