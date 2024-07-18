import React from 'react'

const ProductDescription = () => {
  return (
    <div className='max-padd-container mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>Description</button>
            <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Care Guide</button>
            <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Size Guide</button>
        </div>
        <div className='flex
        flex-col pb-16'>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti hic praesentium dicta distinctio expedita ipsam molestias repellendus dolore voluptatem molestiae? Quam iusto modi, accusantium autem excepturi optio consectetur consequatur laudantium.</p>
            <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non officia fuga quas iusto dolorum. Laudantium sit similique neque voluptas possimus obcaecati blanditiis! Expedita asperiores, tempora vel voluptates harum dolorem ratione.</p>
        </div>
    </div>
  )
}

export default ProductDescription