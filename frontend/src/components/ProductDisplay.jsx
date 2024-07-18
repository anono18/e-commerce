import React, { useContext } from 'react'
import { FaStar, FaHeart } from 'react-icons/fa6'
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext)

  return (
    <section className='max-padd-container flex flex-col gap-8 xl:flex-row bg-primary py-4'>
      {/**left slim */}
      <div className='flex gap-x-2 xl:flex-1 py-5 '>
        <div className='flex flex-col gap-[7px] flex-wrap'>
          <img src={product.image} alt="" className='max-h-[84px] rounded-lg bg-gray-10'/>
          <img src={product.image} alt="" className='max-h-[84px] rounded-lg bg-gray-10'/>
          <img src={product.image} alt="" className='max-h-[84px] rounded-lg bg-gray-10'/>
          <img src={product.image} alt="" className='max-h-[84px] rounded-lg bg-gray-10'/>
        </div>
        <div className='max-h-[355px] w-auto flex'>
          <img src={product.image} alt="bigImg" className='rounded-xl bg-gray-10' />
        </div>
      </div>
      {/**right slim */}

      <div className='flex-col flex xl:flex-[1.5] bg-white px-6 py-2 rounded-xl border '>
        <h3 className='h-3 uppercase text-xl bold'>{product.name}</h3><br />
        <div className=' gap-x-2 medium-16 flexitems-Start'>
          <br />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar /><p>{223}</p>
        </div>
        <div className='flex items-baseline gap-x-6 bold-28 sm:bold-32 mt-4'>
          <div className='bold-20 sm:bold-28 text-secondary'> ${product.new_price}.00</div>
          <div className='bold-20 sm:bold-28 line-through'> ${product.old_price}.00</div>
        </div>
        <div>        
          {/**product colors and icons button */} 
          <div className='flex flex-col sm:flex-row gap-x-10 gap-y-3 my-6'>
            <div>
              <h4 className='bold-16'>Select Color</h4>
              <div className='flex gap-3 my-3'>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryRed'></div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryYellow'></div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryBlue'></div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryGreen'></div>
              </div>
            </div>
            <div>
              <h4 className='bold-16'> Select Size:</h4>
              <div className='flex gap-3 my-3'>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md'>S</div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md'>M</div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md'>L</div>
                <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md'>XL</div>
              </div>
            </div>
          </div>
          <div className='flex gap-3 mb-8 max-w-[555px]'>
            <button onClick={() => { addToCart(product.id) }} className='btn-dark rounded-md'>Add to cart</button>
            <button className='btn-secondary rounded-md !py-4'><FaHeart /></button>
          </div>
          <p><span className='medium-16 text-tertiary'>Category :</span> Women | Jacket | Winter</p>
          <p><span className='medium-16 text-tertiary'>Tags :</span> Modern | NewArrivals </p>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplay