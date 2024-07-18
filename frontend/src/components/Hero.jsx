import React from 'react';
import { Link } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import { TbTrash, TbX, TbSearch } from "react-icons/tb";


const Hero = () => {
    return (
        <section>
            <div className='max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[744px] w-full'>
                <div className='flex justify-center mb-1'>
                    <div className='relative w-full max-w-lg mt-6' >
                        <input
                            type="text"
                            placeholder="Rechercher un produit"
                            className='p-3 pl-10 w-full border border-gray-300 rounded-full bg-white'
                        />
                        <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        <button className='absolute right-3 top-1/2 transform -translate-y-1/2 '>
                        </button>
                    </div>
                </div>
                <div className='relative top-24 xs:top-32'>
                    <h4 className='uppercase medium-18 tracking-wider'>TRENDY TREASURES</h4>
                    <h2 className='h1 capitalize max-w-[40rem]'>Elevate Your Look <span className='text-secondary'> With Every Click.</span> Shop Today!</h2>
                    <p className='my-5 max-w-[33rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis aut ab voluptatum? Consequatur expedita impedit saepe temporibus quaerat consequuntur perferendis ipsam sit doloremque cupiditate dolore architecto corporis, exercitationem ea.</p>
                    {/**button */}
                    <div className='inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl'>
                        <div className='text-center regular-14 leading-tight pl-5'>
                            <h5 className='uppercase font-bold'>30% off</h5>
                            <p className='regular-14'>On All Items</p>
                        </div>
                        <Link to={''} className='btn-dark rounded-xl flexCenter !py-5'>Shop Now</Link>
                    </div>
                    {/** newcollection */}
                    <div className='mt-14 mb-3'>
                        <RelatedProducts />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
