import SingleProduct from '@/components/SingleProduct';
import React, { Suspense } from 'react';

const ProductDetailsPage = ({params}: {params: Promise<{productId: string}>}) => {

 

    return (
        <Suspense>
            <SingleProduct params={params}/>
        </Suspense>
    );
};

export default ProductDetailsPage;