import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Dashboard />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/products/add' element={<AddProduct />} />
          <Route path='/products/:id/update' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
