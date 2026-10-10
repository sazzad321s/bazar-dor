import React from 'react';
import { Iallproduct } from './Marquee';
import { bn,bnUnit } from '@/lib/utils';

const CategoryProducts = async({params} : {params: Promise<{categoryId: string}>}) => {

  const {categoryId} = await params;

    const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );

  if (!res.ok) {
    throw new Error('Data Fetching Failed');
  }

  const data: Iallproduct[] = await res.json();
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
            <p className='text-lg text-gray-500 mt-5 mb-2'>মোট {bn(data.length)} টি পণ্য দেখানো হচ্ছে</p>
            <div  className="rounded-xl grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {
                data.map((p) =>  (
                                  <div
                                    key={p.id}
                                    className="flex flex-col gap-2 p-4 bg-[#FAFCFA] rounded-lg"
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
                                )
                    
                )
            }
            </div>
        </div>
    );
};

export default CategoryProducts;