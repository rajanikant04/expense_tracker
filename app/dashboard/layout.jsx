'use client'
import React, { useEffect } from 'react'
import SideNav from './SideNav'
import DashboardHeader from './DashboardHeader'
import { db } from '@/utils/dbConfig';
import { useUser } from '@clerk/nextjs';

function DashBoardlayout({children}) {
  const {user} = useUser();
  useEffect(()=>{
    console.log(user);
  },[user])
  // const checkUserrBudgets = async() =>{
  //    const result = await db.select()
  //    .from(Budgets)
  //    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.email))
  // }

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav />
        </div>
        <div className='md: ml-64'>
            <DashboardHeader />
            {children}
        </div>
    </div>
  )
}

export default DashBoardlayout