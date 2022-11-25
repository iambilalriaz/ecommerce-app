import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../utils/api';
import Spinner from '../Spinner';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((response) => {
        setProduct(response?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  return (
    <div className='text-center'>
      {loading ? (
        <Spinner size={64} />
      ) : (
        <>
          <div className='flex justify-center w-full'>
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className='w-[50%]'
            />
          </div>
          <p className='my-4 text-[2rem] font-semibold'>{product?.title}</p>
          <p className='text-[#5a5a5a]'>{product?.description}</p>
          <p>
            Brand: <span className='font-semibold'>{product?.brand}</span>
          </p>
          <p>
            Category: <span className='font-semibold'>{product?.category}</span>
          </p>
          <p>
            Price: <span className='font-semibold'>${product?.price}</span>
          </p>
          <p>
            Stock: <span className='font-semibold'>{product?.stock}</span>
          </p>
          <p>
            Ratings: <span className='font-semibold'>{product?.rating}</span>
          </p>
          <div className='m-[5rem]'>
            {product?.images?.length ? (
              <>
                <p className='text-[2rem] font-semibold'>More Images</p>
                <div className=''>
                  {product?.images?.map((image) => (
                    <img
                      className='m-auto'
                      src={image}
                      alt={image}
                      key={image}
                    />
                  ))}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
