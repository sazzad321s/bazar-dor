import React from 'react';
import { Skeleton } from '@heroui/react';

const LoadingPage = () => {
    return (
       <div className="w-325 space-y-5 rounded-lg bg-gray-100 p-4 mt-4">
  <Skeleton className="h-32 w-full rounded-lg" />

  <div className="space-y-3">
    <Skeleton className="h-3 w-3/5 rounded-lg" />
    <Skeleton className="h-3 w-4/5 rounded-lg" />
    <Skeleton className="h-3 w-2/5 rounded-lg" />
  </div>
</div>
    );
};

export default LoadingPage;