import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProduct, updateProduct } from '../../utils/api';
import Spinner from '../Spinner';
import Input from './Input';
const initialProdState = {
  title: '',
  brand: '',
  category: '',
  description: '',
  price: '',
  rating: '',
  stock: '',
  thumbnail: '',
  images: [],
};
const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [waitingForAction, setWaitingForAction] = useState(false);
  const [product, setProduct] = useState(initialProdState);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      setIsSaveButtonClicked(false);
      setLoading(true);
      getProduct(parseInt(id))
        .then((response) => {
          setProduct(response?.data || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setProduct(initialProdState);
      setIsSaveButtonClicked(false);
    }
  }, [id]);
  const onAddUpdateProduct = () => {
    setIsSaveButtonClicked(true);
    console.log(product);
    if (
      product?.title &&
      product?.brand &&
      product?.category &&
      product?.description &&
      product?.price &&
      product?.price >= 0 &&
      product?.rating &&
      product?.rating >= 0 &&
      product?.stock &&
      product?.stock >= 0 &&
      product?.thumbnail
    ) {
      setWaitingForAction(true);

      let newProduct = {
        ...product,
        price: parseFloat(product?.price),
        rating: parseFloat(product?.rating),
        stock: parseFloat(product?.stock),
      };
      if (id) {
        updateProduct(parseInt(id), newProduct)
          .then(() => {
            setWaitingForAction(false);
            navigate(-1);
          })
          .catch(() => setWaitingForAction(false));
      } else {
        addProduct(newProduct)
          .then(() => {
            setWaitingForAction(false);
            navigate(-1);
          })
          .catch(() => setWaitingForAction(false));
      }
    }
  };
  return loading || waitingForAction ? (
    <Spinner size={64} />
  ) : (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        <Input
          label='Title'
          value={product?.title}
          onChange={(value) => setProduct({ ...product, title: value })}
          error={isSaveButtonClicked && !product?.title}
        />
        <Input
          label='Brand'
          value={product?.brand}
          onChange={(value) => setProduct({ ...product, brand: value })}
          error={isSaveButtonClicked && !product?.brand}
        />
        <Input
          label='Category'
          value={product?.category}
          onChange={(value) => setProduct({ ...product, category: value })}
          error={isSaveButtonClicked && !product?.category}
        />
        <Input
          label='Description'
          value={product?.description}
          onChange={(value) => setProduct({ ...product, description: value })}
          error={isSaveButtonClicked && !product?.description}
        />
        <Input
          label='Price'
          value={product?.price}
          onChange={(value) => setProduct({ ...product, price: value })}
          error={isSaveButtonClicked && !product?.price}
          isNumber={true}
        />
        <Input
          label='Ratings'
          value={product?.rating}
          onChange={(value) => setProduct({ ...product, rating: value })}
          error={isSaveButtonClicked && !product?.rating}
          isNumber={true}
        />
        <Input
          label='Stock'
          value={product?.stock}
          onChange={(value) => setProduct({ ...product, stock: value })}
          error={isSaveButtonClicked && !product?.stock}
          isNumber={true}
        />
        <Input
          label='Thumbnail'
          value={product?.thumbnail}
          onChange={(value) => setProduct({ ...product, thumbnail: value })}
          error={isSaveButtonClicked && !product?.thumbnail}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        <Input
          label='Image#1'
          value={product?.images?.[0] || ''}
          onChange={(value) =>
            setProduct({ ...product, images: [...product.images, value] })
          }
        />
        <Input
          label='Image#2'
          value={product?.images?.[1] || ''}
          onChange={(value) =>
            setProduct({ ...product, images: [...product.images, value] })
          }
        />
        <Input
          label='Image#3'
          value={product?.images?.[2] || ''}
          onChange={(value) =>
            setProduct({ ...product, images: [...product.images, value] })
          }
        />
      </div>
      <div className='flex justify-center mt-4'>
        <span
          onClick={() => navigate('/')}
          className='text-white bg-[#ccc] hover:bg-[#ccc]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'
        >
          Back
        </span>
        <span
          onClick={onAddUpdateProduct}
          className='ml-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'
        >
          Save Changes
        </span>
      </div>
    </>
  );
};

export default AddProduct;
