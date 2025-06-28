import React from 'react'
import Budgets from './page'
import Link from 'next/link'

function BudgetItem({budget}) {

    const calculateProgressPerc= ()=> {
        const perc = (budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }

  return (
    <Link href={'/dashboard/expenses/'+budget?.id} >
    <div className='p-4 border rounded-md hover:shadow-md cursor-pointer h-[150px] mb-5'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl p-3 px-4 bg-slate-200 rounded-full'>{budget?.icon}</h2>
                <div>
                    <h2 className='font-bold'>{budget?.name}</h2>
                    <h2 className='text-sm text-gray-500'>{budget?.totalItem} items</h2>
                </div>
            </div>
            <div>
                <h2 className='font-bold text-blue-700 text-lg'>${budget?.amount}</h2>
            </div>
        </div>
        <div className='mt-5'>
            <div className='flex justify-between mb-2'>
                <h2 className='text-xs text-slate-500'>${budget.totalSpend? budget.totalSpend:0} Spend</h2>
                <h2 className='text-xs text-slate-500'>${budget.amount-budget.totalSpend} Remaining</h2>
            </div>
            <div className='w-full bg-slate-300 h-2 rounded-full'>
                <div className='w-[40%] bg-blue-500 h-2 rounded-full'
                style={{
                    width:`${calculateProgressPerc()}%`
                }}
                >
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default BudgetItem