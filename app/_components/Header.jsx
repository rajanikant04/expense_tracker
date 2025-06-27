"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {

  const {user, isSignedIn} = useUser()

  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
      
      <Image src={'/logo.jpg'}
        alt='logo'
        width={50}
        height={50}
        priority
      />
      {
        isSignedIn? 
        <UserButton /> : 
        <SignInButton>
          <Button>Get started</Button>
        </SignInButton>
      }
    </div>
  )
}

export default Header