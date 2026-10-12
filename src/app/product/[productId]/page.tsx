import { notFound } from 'next/navigation';
import LoadingPage from '@/app/loading';
import SingleProduct from '@/components/SingleProduct';
import React, { Suspense } from 'react';

const ProductDetailsPage = ({params}: {params: Promise<{productId: string}>}) => {

 

    return (
        <Suspense fallback={<LoadingPage />}>
            <SingleProduct params={params}/>
        </Suspense>
    );
};

export default ProductDetailsPage;