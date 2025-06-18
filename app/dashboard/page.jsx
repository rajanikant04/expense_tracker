'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

function DashBoard() {
  const showToast = () => {
    console.log('Toast button clicked') // Debug line
    toast.success('Test message - this should work!')
    toast.error('Error message test')
    toast.info('Info message test')
  }

  return (
    <div className="p-4">
      <Button onClick={showToast}>
        Test Toast
      </Button>
    </div>
  )
}

export default DashBoard