'use client'
import React, { useEffect } from 'react'
import SideNav from './SideNav'
import DashboardHeader from './DashboardHeader'
import { db } from '@/utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { usePathname, useRouter } from 'next/navigation';

function DashBoardlayout({children}) {
  const {user} = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
      console.log(result);

      if (result?.length === 0 && pathname === '/dashboard') {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error('Error checking user budgets:', error);
    }
  };


  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <DashboardHeader />
            {children}
        </div>
    </div>
  )
}

export default DashBoardlayout