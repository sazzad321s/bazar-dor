import { notFound } from 'next/navigation';
import LoadingPage from '@/app/loading';
import CategoryProducts from '@/components/CategoryProducts';
import React, { Suspense } from 'react';


const CategoryPage = ({params} : {params: Promise<{categoryId: string}>}) => {


    return (
       <Suspense fallback={<LoadingPage />}>
            <CategoryProducts params={params}/>
       </Suspense>
    );
};

export default CategoryPage;