import React from 'react';
import { Iallproduct } from '@/components/Marquee';
import { bn, bnUnit } from '@/lib/utils';
import { notFound } from 'next/navigation';

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
    {
      cache: 'force-cache',
    }
  );

  

  const product: Iallproduct = await res.json();

 if (!product || !product.id) {
  notFound();
}



  return (
    <div className="mt-5 mb-14 lg:w-325 md:w-225 sm:125">
      {/* Product Header */}
      <div className="flex items-center justify-between gap-3 bg-[#FAFCFA] border border-[#E6EEE6] rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center bg-[#F0F5F0] rounded-xl w-14 h-14 text-3xl shrink-0">
            {product.image}
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-xl text-gray-900">
              {product.nameBn}
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              প্রতি {bnUnit(product.unit)} · {product.categoryNameBn}
            </p>

            <div className="text-xs text-gray-600 mt-1">
              {
                product.today > product.yesterday ? (<p>গতকালের তুলনায় আজ দাম বেড়েছে · {bn(product.today - product.yesterday)} টাকা</p>) :
                 (product.today < product.yesterday ? (<p>গতকালের তুলনায় দাম কমেছে · {bn(product.yesterday - product.today)} টাকা</p>)
                 :(<p>দামের কোনো পরিবর্তন হয়নি</p>)
                )
              }
            </div>
          </div>
        </div>

        <div className="bg-[#F0F5F0] rounded-xl p-3 text-center shrink-0 min-w-20">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="font-bold text-2xl text-gray-900">
            {bn(product.today)}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {bnUnit(product.unit)}
          </p>

          <p
            className={`text-xs font-semibold mt-1 ${
              product.change.dir === 'down'
                ? 'text-green-600'
                : product.change.dir === 'up'
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}
          >
            {product.change.dir === 'down'
              ? '▼'
              : product.change.dir === 'up'
                ? '▲'
                : '—'}{' '}
            {bn(Math.abs(product.change.pct))}%
          </p>
        </div>
      </div>

      {/* Price Summary + Market Prices */}
      <div className="bg-[#FAFCFA] border border-[#E6EEE6] rounded-xl p-4 mt-3">
        <h2 className="font-bold text-sm text-gray-900 mb-3">
          দামের সারসংক্ষেপ
        </h2>

        {/* Three Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-[#E6EEE6] rounded-xl p-3">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

            <p className="font-bold text-lg text-green-600 mt-1">
              {bn(Math.min(
               ...product.markets.map((market) => Number(market.min))
              ))} টাকা
            </p>

            <p className="text-xs text-gray-600 mt-1">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="border border-[#E6EEE6] rounded-xl p-3">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>

            <p className="font-bold text-lg text-red-500 mt-1">
              {bn(Math.max(
               ...product.markets.map((market) => Number(market.max))
              ))} টাকা
            </p>

            <p className="text-xs text-gray-600 mt-1">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="border border-[#E6EEE6] rounded-xl p-3">
            <p className="text-xs text-gray-500">গড় দাম</p>

            <p className="font-bold text-lg text-green-600 mt-1">
              {bn(
                (
                  Math.max(
               ...product.markets.map((market) => Number(market.max))
              ) +   Math.min(
               ...product.markets.map((market) => Number(market.min))
              )

                )/2
              )} টাকা
            </p>

            <p className="text-xs text-gray-600 mt-1">
              প্রতি {bnUnit(product.unit)}-এর দাম
            </p>
          </div>
        </div>

        {/* Market Price Table */}
        <h2 className="font-bold text-sm text-gray-900 mt-5 mb-3">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[#E6EEE6]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAFCFA] text-gray-600">
                <th className="p-3 font-semibold">বাজার</th>
                <th className="p-3 font-semibold">বিভাগ</th>
                <th className="p-3 font-semibold text-right">সর্বনিম্ন</th>
                <th className="p-3 font-semibold text-right">সর্বোচ্চ</th>
                <th className="p-3 font-semibold text-right">গড়</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => {
                const min = Number(market.min);
                const max = Number(market.max);
                const average = (min + max) / 2;

                return (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-[#AEB9AE] ${
                      index % 2 === 0 ? 'bg-[#F0F5F0]' : 'bg-[#FAFCFA]'
                    }`}
                  >
                    <td className="p-3 text-gray-800 whitespace-nowrap">
                      {market.market}
                    </td>

                    <td className="p-3 text-gray-700 whitespace-nowrap">
                      {market.division}
                    </td>

                    <td className="p-3 text-gray-800 text-right whitespace-nowrap">
                      {bn(market.min)} টাকা
                    </td>

                    <td className="p-3 text-gray-800 text-right whitespace-nowrap">
                      {bn(market.max)} টাকা
                    </td>

                    <td className="p-3 text-gray-800 text-right font-semibold whitespace-nowrap">
                      {Number.isFinite(average)
                        ? `${bn(Number(average.toFixed(2)))} টাকা`
                        : '—'}
                    </td>
                  </tr>
                );
              })}

              {product.markets.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-5 text-center text-gray-500"
                  >
                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;