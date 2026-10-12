
import React from 'react';
import { Iallproduct } from './Marquee';
import { bn } from '@/lib/utils';
import ProductList from './ProductList';
import { notFound } from 'next/navigation';

const CategoryProducts = async({params} : {params: Promise<{categoryId: string}>}) => {

  const {categoryId} = await params;

    const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );

  if (!res.ok) {
    throw new Error('Data Fetching Failed');
  }

  const data: Iallproduct[] = await res.json();

  if (data.length === 0) {
  notFound();
}
  console.log(data);

    return (
        <div className='mt-10'>
            <div className='flex items-center gap-1 lg:w-325 md:225 sm:125 border-base-300 bg-[#FAFCFA] py-6 px-2 rounded-xl'>
                <div className='border border-[#F0F5F0] rounded-md text-5xl'>{data[0].categoryIcon}</div>
                <div>
                    <h2 className='font-bold text-xl'>{data[0].categoryNameBn}</h2>
                    <p className='text-lg text-gray-500'>{bn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>
            
            <ProductList products={data}/>
        </div>
    );
};

export default CategoryProducts;