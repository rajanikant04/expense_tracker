import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({budgetId, refreshData}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const addNewExpense = async() =>{
        const result = await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:moment().format('DD/MM/YYYY') ,
        }).returning({insertedId:Budgets.id});

        console.log(result);

        if(result) {
            refreshData();
            toast.success('New Expense Added!')
        }

    }

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1 ">Expense Name</h2>
        <Input
          placeholder="e.g. Home Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1 ">Amount</h2>
        <Input
          placeholder="e.g. $1000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&amount)} 
        onClick={()=>addNewExpense()}
        className="mt-3 w-full bg-blue-500 hover:bg-blue-700 cursor-pointer">Add New Expense</Button>
    </div>
  );
}

export default AddExpense;
