'use client'
import React, { useState } from 'react';
import { Iallproduct } from './Marquee';
import { bn, bnUnit } from '@/lib/utils';
import Link from 'next/link';

const ProductList = ({products}:{products: Iallproduct[]}) => {

   const [sortBy, setSortBy] = useState<"default" | "low-to-high" | "high-to-low">('default');

  const sortedProducts = (products: Iallproduct[]) => {
    const sortProducts = [...products];
    if (sortBy === 'low-to-high') {
      sortProducts.sort((a,b) => a.today - b.today)
    }

    if (sortBy === 'high-to-low') {
     sortProducts.sort((a,b) => b.today - a.today)
    }

    return sortProducts;
   };

  const productsSort = sortedProducts(products);

    return (
        <div>
            
            {/* Sorting */}
               <div className="flex items-center gap-2 justify-end mb-3 mt-3 bg-[#FAFCFA] rounded-lg py-4 pr-3">
                <p className='text-gray-500'>সাজান</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "default" | "low-to-high" | "high-to-low")}
          className="border rounded-lg px-3 py-2 bg-[#FAFCFA]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">কম থেকে বেশি</option>
          <option value="high-to-low">বেশি থেকে কম</option>
        </select>
      </div>
    
                <p className='text-lg text-gray-500 mt-5 mb-2'>মোট {bn(products.length)} টি পণ্য দেখানো হচ্ছে</p>
            {/* Products Card */}
                          <div  className="rounded-xl grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {
                productsSort.map((p) =>  ( <Link key={p.id} href={`/product/${p.id}`}>
                                  <div
                                    key={p.id}
                                    className="flex flex-col gap-2 p-4 bg-[#FAFCFA] rounded-lg  hover:border-3 hover:border-green-700"
                                  >
                                    {/* image and name */}
                                    <div className="flex items-center gap-1">
                                      <div className="border border-[#F0F5F0] rounded-md text-3xl">
                                        {p.image}
                                      </div>
                        
                                      <div>
                                        <h2 className="font-bold text-lg">{p.nameBn}</h2>
                                        <p className="text-sm text-gray-500">
                                          প্রতি {bnUnit(p.unit)}
                                        </p>
                                      </div>
                                    </div>
                        
                                    {/* Price and percentage */}
                                    <div className="flex justify-between">
                                      {/* Price */}
                                      <div>
                                        <p className="text-sm text-gray-500">আজকের দাম</p>
                                        <p className="text-sm text-gray-500">
                                          <span className="font-bold text-black text-md">
                                            {bn(p.today)}
                                          </span>{' '}
                                          টাকা
                                        </p>
                                      </div>
                        
                                      {/* rate */}
                                      <div className="bg-[#F0F5F0] rounded-full flex items-center px-2">
                                        {
                                            p.change.dir === "down" ?
                                             (<span className="text-green-600">
                                          ▼ {bn(Math.abs(p.change.pct))}%
                                        </span>)
                                         : p.change.dir === "up" ? (<span className='text-red-500'>▲ {bn(Math.abs(p.change.pct))}%</span>)
                                          : (<span className='text-gray-500'>- {bn(Math.abs(p.change.pct))}%</span>)
                                        }
                                        
                                      </div>
                                    </div>
                                  </div>
                                  </Link>
                                )
                    
                )
            }
            </div>
        </div>
    );
};

export default ProductList;