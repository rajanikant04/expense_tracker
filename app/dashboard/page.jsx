'use client'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import CardInfo from './CardInfo';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './BarChartDashboard';
import BudgetItem from './budgets/BudgetItem';
import ExpensesListTable from './expenses/ExpensesListTable';

function DashBoard() {

  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] =useState([]);

  useEffect(()=> {
    user&&getBudgetList();
  },[user])


  const getBudgetList = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))

    setBudgetList(result);
    getAllExpenses();
  }

  const getAllExpenses = async ()=> {
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.createdAt))

    setExpensesList(result);
    console.log(result)
  }

  return (
    <div className="p-3 sm:p-5 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className='font-bold text-2xl sm:text-3xl'>Hi, {user?.firstName}</h2>
        <p className='text-gray-500 text-sm sm:text-base mt-1'>Here's what happening with your money, Let's manage your money</p>
      </div>
      
      <CardInfo budgetList={budgetList} />

      <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-4 sm:gap-5'>
        <div className='lg:col-span-2 xl:col-span-3 space-y-4 sm:space-y-6'>
          <BarChartDashboard budgetList={budgetList}/>
          <ExpensesListTable 
            expensesList={expensesList}
            refreshData={()=> getBudgetList()}
          />
        </div>
        <div className='lg:col-span-1 xl:col-span-1'>
          <h2 className='font-bold text-xl sm:text-2xl mb-3'>Latest Budgets</h2>
          <div className="space-y-3 max-h-96 lg:max-h-screen lg:overflow-y-auto">
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard