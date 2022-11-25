import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../utils/api';
import Product from '../Product';
import Spinner from '../Spinner';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((response) => {
        setProducts(response?.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setProducts]);
  return loading ? (
    <div className=' w-full h-full flex justify-center items-center'>
      <Spinner size={64} />
    </div>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
      {products?.map((product) => (
        <Product
          setProducts={setProducts}
          key={product?.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default Dashboard;
