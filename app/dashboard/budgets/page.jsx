'use client'
import React from 'react'
import BudgetList from './BudgetList'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

function Budgets() {

  const route = useRouter();

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
      <div className='flex items-center gap-2'>
            <ArrowLeft className='cursor-pointer hover:bg-gray-300 hover:rounded-full' onClick={()=> route.back() } /> 
            My Budgets
      </div>
      </h2>
      <BudgetList />
    </div>
  )
}

export default Budgets