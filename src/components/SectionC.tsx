
import React from 'react';
import { Iallproduct } from './Marquee';
import { bn, bnUnit } from '@/lib/utils';
import Link from 'next/link';

const AllProducts = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    {
      cache: 'force-cache',
    }
  );

  if (!res.ok) {
    throw new Error('Product data failed');
  }

  const data = await res.json();
  return data;
};

const SectionC = async() => {

    const allProduct: Iallproduct[] = await AllProducts();
    return (
         <div className='lg:mt-10 mt-4' id="allproducts">
              <h2 className="font-bold text-xl my-2">
                সব পণ্য
              </h2>
               <p className='text-gray-500 mb-2'>মোট {bn(allProduct.length)}টি পণ্য দেখানো হচ্ছে</p>
              <div className="rounded-xl grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {allProduct.map((p) => ( <Link key={p.id} href={`/product/${p.id}`}>
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
                   </Link>
                ))}
              </div>
            </div>
    );
};

export default SectionC;