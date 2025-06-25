'use client'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/BudgetItem';
import AddExpense from '../AddExpense';

function ExpensesPage({params}) {

    const {user} = useUser()
    const [budgetInfo, setBudgetInfo] = useState([]);

    useEffect(()=>{
        // console.log(params);
        user&&getBudgetInfo();   
    },[params]);

    const getBudgetInfo = async() =>{
        const result = await db.select({
              ...getTableColumns(Budgets),
              totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
              totalItem: sql `count(${Expenses.id})`.mapWith(Number)
            }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params?.id))
            .groupBy(Budgets.id)

        setBudgetInfo(result[0]);
        // console.log(result[0]);
    }

  return (
    <div className='p-10'> 
        <h2 className='text-2xl font-bold'>My Expenses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5 '>
            {budgetInfo && budgetInfo.id ? (
              <BudgetItem budget={budgetInfo} />
            ) : (
              <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
            )}
          <AddExpense 
          budgetId={params?.id}
          refreshData={()=> getBudgetInfo()}
           />
        </div>
    </div>
  )
}

export default ExpensesPage