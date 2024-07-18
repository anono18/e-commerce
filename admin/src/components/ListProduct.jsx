import React, { useEffect, useState } from 'react';
import { TbTrash, TbX, TbSearch } from "react-icons/tb";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInfo = async () => {
    const res = await fetch('http://localhost:4000/allproducts');
    const data = await res.json();
    setAllproducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    await fetchInfo();
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const res = await fetch('http://localhost:4000/searchproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: term }),
      });
      const data = await res.json();
      setFilteredProducts(data);
    } else {
      setFilteredProducts(allproducts);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(allproducts);
  };

  return (
    <div className='p-2 box-border bg-white mb-0 rounded-sm w-full mt-5 lg:ml-5'>
      <h4 className='bold-22 p-5 uppercase text-secondary underline text-center '>Liste des Produits</h4>
      <div className='flex justify-center mb-4'>
        <div className='relative w-full max-w-lg'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Rechercher un produit"
            className='p-3 pl-10 w-full border border-gray-300 rounded-full'
          />
          <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
          {searchTerm && (
            <button onClick={clearSearch} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
              <TbX size={20} />
            </button>
          )}
        </div>
      </div>
      <div className='max-h-[77vh] overflow-auto px-4 text-center'>
        <table className='w-full mx-auto'>
          <thead >
            <tr className='bg-primary bold-14 sm:regular-22 text-start py-12 '>
              <th className='p-2'>Produits</th>
              <th className='p-2'>Titre</th>
              <th className='p-2'>Ancien prix</th>
              <th className='p-2'>Nouveau prix</th>
              <th className='p-2'>Catégorie</th>
              <th className='p-2'>Effacer</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, i) => (
              <tr key={i} className='border-b border-slate-900/20 text-gray-20 medium-14'>
                <td className='flexCenter my-2'>
                  <img src={product.image} alt={product.name} height={50} width={55} className='rounded-lg ring-1 ring-slate-900/5' />
                </td>
                <td><div className='line-clamp-3'>{product.name}</div></td>
                <td>${product.old_price}.00</td>
                <td>${product.new_price}.00</td>
                <td>{product.category}</td>
                <td><div className='bold-22 pl-6 sm:pl-14'><TbTrash onClick={() => remove_product(product.id)} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;


