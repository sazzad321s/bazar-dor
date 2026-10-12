import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import {bn, bnUnit} from "@/lib/utils"
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface Iallproduct {
    "id": number,
    "slug": string,
    "nameBn": string,
    "category": string,
    "categoryNameBn": string,
    "categoryIcon": string,
    "unit": string,
    "image": string,
    "today": number,
    "yesterday": number,
    "lastWeek": number,
    "lastMonth": number,
    "change": {
      "dir": string,
      "pct": number
    },
    "markets": 
    {
      "market": string,
      "division": string,
      "min": string,
      "max": string
    }[]
}

const headLine = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products'
        ,
     {
      cache: "force-cache",
    }
    );
    if(!res.ok){
        throw new Error("Headline data not visible");
    }
    const data = await res.json();
    return data;

}

const Marquee = async() => {

  const allProduct:Iallproduct[] = await headLine();
  const filteredProduct = allProduct.filter((elem) => elem.change.dir !== "flat" )

 
    
    return (
      <div className="w-full overflow-hidden border-y border-gray-200 bg-white sticky top-0 z-100">
    <MarqueeText
      className="py-2"
      direction="right"
      duration={12}
    >
      {filteredProduct.map((product) => (
        <div
          key={product.id}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-gray-200 px-4 text-sm"
        >
          <span>{product.image}</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>

          <span className="text-gray-700">
            {bn(product.today)} টাকা/{bnUnit(product.unit)}
          </span>

          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              product.change.dir === "up"
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {product.change.dir === "up" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}

            {bn(Math.abs(product.change.pct))}%
          </span>
        </div>
      ))}
    </MarqueeText>
  </div>
    );
};

export default Marquee;