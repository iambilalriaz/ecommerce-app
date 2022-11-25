import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../../utils/api';
import DeleteModal from '../DeleteModal';
import './styles.css';

const Product = ({ product, setProducts }) => {
  const [hovered, setHovered] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const onDeleteProduct = () => {
    deleteProduct(selectedProduct).then(() => {
      getAllProducts().then(({ data }) => {
        setProducts(data || []);
        setShowModal(false);
      });
    });
  };
  return (
    <div className='w-full max-w-sm bg-white rounded-lg shadow-md flex-col justify-around items-center'>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteHandler={onDeleteProduct}
      />
      <div
        className='h-[200px] overflow-hidden relative'
        onMouseEnter={() => setHovered(product?.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          className={`w-full h-[100%] rounded-t-lg ${
            hovered === product?.id ? 'product-image' : ''
          }`}
          src={product.thumbnail}
          alt={product?.description}
        />
        {hovered === product?.id && (
          <div className='flex justify-evenly items-center absolute top-0 h-full w-full  text-black'>
            <div
              className='text-xs cursor-pointer px-4 py-2 rounded-md bg-[#ccc] border-[#ccc]'
              onClick={() => navigate(`/products/${product?.id}`)}
            >
              View
            </div>
            <div
              className='text-xs cursor-pointer px-4 py-2 rounded-md bg-[#ccc] border-[#ccc]'
              onClick={() => navigate(`/products/${product?.id}/update`)}
            >
              Edit
            </div>
            <div
              className='text-xs cursor-pointer px-4 py-2 rounded-md bg-[#ccc] border-[#ccc]'
              onClick={() => {
                setShowModal(true);
                setSelectedProduct(product?.id);
              }}
              data-bs-toggle='modal'
              data-bs-target='#exampleModalCenter'
            >
              Delete
            </div>
          </div>
        )}
      </div>
      <div className='p-5'>
        <h5 className='text-xl font-semibold tracking-tight text-gray-900'>
          {product?.title}
        </h5>
        <div className='flex justify-between items-center mt-2.5 mb-5'>
          <div>Ratings</div>
          <div className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
            {product.rating}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-3xl font-bold text-gray-900 '>
            ${product?.price}
          </span>
          <div className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
