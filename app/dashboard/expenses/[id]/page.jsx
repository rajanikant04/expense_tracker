'use client'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/BudgetItem';
import AddExpense from '../AddExpense';
import ExpensesListTable from '../ExpensesListTable';
import { Button } from '@/components/ui/button';
import { Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../EditBudget';


function ExpensesPage({ params }) {

    const unwrappedParams = React.use(params);

    const {user} = useUser();
    const route = useRouter(); 
    const [budgetInfo, setBudgetInfo] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(()=>{
        // console.log(unwrappedParams);
        user && getBudgetInfo();   
    },[unwrappedParams]);

    const getBudgetInfo = async() =>{
        const result = await db.select({
              ...getTableColumns(Budgets),
              totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
              totalItem: sql `count(${Expenses.id})`.mapWith(Number)
            }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, unwrappedParams?.id))
            .groupBy(Budgets.id)

        setBudgetInfo(result[0]);
        getExpensesList();
    }

    const getExpensesList = async() => {
      const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .orderBy(desc(Expenses.id))

      setExpensesList(result);
      console.log(result);
    }

    const deleteBudget = async() => {
      const deleteExpenseResult = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning()

      if(deleteExpenseResult) {
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
      }

      if(deleteExpenseResult) toast.success("Budget successfully deleted!"); 
      route.replace('/dashboard/budgets');
      
    }
    
    return (
      <div className='p-10'> 
        <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses
          <div className='flex gap-2 items-center'>
            <EditBudget budgetInfo = {budgetInfo}
              refreshData={()=> getBudgetInfo()}
            />
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 cursor-pointer" variant="destructive" >
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your currect budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=> deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
          </div>


        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5 '>
            {budgetInfo && budgetInfo.id ? (
              <BudgetItem budget={budgetInfo} />
            ) : (
              <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
            )}
          <AddExpense 
          budgetId={unwrappedParams?.id}
          refreshData={()=> getBudgetInfo()}
           />
        </div>
        <div className='mt-4'>
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpensesListTable expensesList={expensesList}
            refreshData={getBudgetInfo}
          />
        </div>
    </div>
  )
}

export default ExpensesPage