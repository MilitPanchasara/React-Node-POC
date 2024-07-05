import logo from './logo.svg';
import './App.css';
import "./styles/sb-admin-2.min.css";
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Userlist from './components/user/Userlist';
import Portal from './components/portal/Portal';
import UserCreate from './components/user/UserCreate';
import UserView from './components/user/UserView';
import UserEdit from './components/user/UserEdit';
import ProductList from './components/Product/ProductList';
import ProductCreate from './components/Product/ProductCreate';
import CustomerList from './components/customer/CustomerList';
import CustomerEdit from './components/customer/CustomerEdit';
import CustomerCreate from './components/customer/CustomerCreate';
import DiscountList from './components/discount/DiscountList';
import { AuthProvider } from './Auth/AuthProvider';
import {ProtectedRoute} from './Auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/portal' element={<ProtectedRoute element={<Portal />} />}>
            <Route path='dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path='user-list' element={<ProtectedRoute element={<Userlist />} />} />
            <Route path='create-user' element={<ProtectedRoute element={<UserCreate />} />} />
            <Route path='user-view/:id' element={<ProtectedRoute element={<UserView />} />} />
            <Route path='user-edit/:id' element={<ProtectedRoute element={<UserEdit />} />} />
            <Route path='product/product-list' element={<ProtectedRoute element={<ProductList />} />} />
            <Route path='product/create-product' element={<ProtectedRoute element={<ProductCreate />} />} />
            <Route path='customer-list' element={<ProtectedRoute element={<CustomerList />} />} />
            <Route path='customer-edit/:id' element={<ProtectedRoute element={<CustomerEdit />} />} />
            <Route path='customer-list/create-customer' element={<ProtectedRoute element={<CustomerCreate />} />} />
            <Route path='discount-list' element={<ProtectedRoute element={<DiscountList />} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
