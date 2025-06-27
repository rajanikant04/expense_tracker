import { PiggyBank, ReceiptIcon, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetList}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(()=> {
        if(budgetList) {
            CalculateCardInfo();
        }
    },[budgetList])


    const CalculateCardInfo = () => {
        console.log(budgetList)
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach(ele => {
            totalBudget_+= Number(ele.amount);
            totalSpend_+= ele.totalSpend
        })
        // console.log(totalBudget_, totalSpend_);
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);

    }

  return (
    <div>
        {budgetList.length>0 ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                </div>
                <PiggyBank className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                </div>
                <ReceiptText
                className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. of Budget</h2>
                    <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                </div>
                <Wallet
                className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white'/>
            </div>
        </div>:
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {[1,2,3].map((item, index) => (
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>

                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default CardInfo