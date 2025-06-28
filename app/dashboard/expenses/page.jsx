'use client'
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ExpensesListTable from "./ExpensesListTable";
import { useUser } from "@clerk/nextjs";

function page() {
  const { user } = useUser();

  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if(user){
        getAllExpenses();
    }
  }, [user]);


  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.createdAt));

    setExpensesList(result);
    console.log(result);
  };

  return (
    <div className="p-10 ">
      <ExpensesListTable
        expensesList={expensesList}
        refreshData={() => getAllExpenses()}
      />
    </div>
  );
}

export default page;
