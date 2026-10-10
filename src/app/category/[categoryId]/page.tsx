
import CategoryProducts from '@/components/CategoryProducts';
import React, { Suspense } from 'react';


const CategoryPage = ({params} : {params: Promise<{categoryId: string}>}) => {


    return (
       <Suspense fallback={<p>Loading Products...</p>}>
            <CategoryProducts params={params}/>
       </Suspense>
    );
};

export default CategoryPage;