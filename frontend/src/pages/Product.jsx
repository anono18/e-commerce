import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductHd from '../components/ProductHd';
import PopularProducts from '../components/PopularProducts';
import ProductDescription from '../components/ProductDescription';
import ProductDisplay from '../components/ProductDisplay';

export const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  console.log(`productId: `, productId);

  useEffect(() => {
    // Remplacez l'URL par celle de votre API pour récupérer les produits
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  const product = allProducts.find((e) => e.id === Number(productId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <section>
      <div>
        <ProductHd product={product} />
        <ProductDisplay product={product} />
        <ProductDescription product={product} />
        <PopularProducts />
      </div>
    </section>
  );
};

export default Product;
