import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Address from "./components/Address/Address";
import Orders from "./components/Orders/Orders";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import UserContextProvider from "./context/User/context";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/Cart/CartContext";
import { Toaster } from "react-hot-toast";


let routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products", element:  <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "cart", element:  <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element:  <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "allorders", element:  <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "address", element: <ProtectedRoute><Address /></ProtectedRoute>  },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>  },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>
      <Toaster/>
    </CartContextProvider>
  );
}

export default App;
