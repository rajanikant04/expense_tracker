import React from 'react'
import SideNav from './SideNav'
import DashboardHeader from './DashboardHeader'

function DashBoardlayout({children}) {
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